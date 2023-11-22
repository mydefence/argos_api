/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
import { io } from 'socket.io-client'
import { once } from 'events'
import { API, ArgosTypesMap, DeviceAdded, DeviceList, DeviceRemoved } from 'argos_types/lib/argos-api'
import uniqid from 'uniqid'

const API_GATEWAY_IP = 'localhost'
const API_GATEWAY_PORT = '5050'

type ApiMsg = {
    message: ArgosTypesMap[keyof ArgosTypesMap]
}
// Register some process signals for shutting down the process
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.')
    process.exit()
})

process.on('SIGINT', function () {
    console.info('SIGINT signal received.')
    process.exit()
})

// Setup the Socket.io connection to Argos
const sc = io(`http://${API_GATEWAY_IP}:${API_GATEWAY_PORT}/`, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5000,
})

// register listeners for Socket.io events
sc.on('disconnect', (reason) => {
    console.log('Argos API: [disconnect]', reason)
    if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, manual reconnect needed
        sc.connect()
    }
})

sc.on('reconnect', (attemt) => {
    console.log(`Argos API: [reconnect] attemts: ${attemt}`)
})

sc.on('reconnecting', (attemt) => {
    console.log(`Argos API: [reconnecting] attemts: ${attemt}`)
})

// Register listener for Argos push events
sc.on(API.DEVICE_LIST, (deviceList: DeviceList) => {
    console.log('\ndeviceList received as push message', deviceList)
})

sc.on(API.DEVICE_ADDED, async (apiMsg: ApiMsg) => {
    console.log('\ndeviceAdded received as push message')
    const deviceAdded = <DeviceAdded>apiMsg.message
    await printDeviceInfo(deviceAdded)
})

sc.on(API.DEVICE_REMOVED, (apiMsg: ApiMsg) => {
    console.log('\ndeviceRemoved received as push message')
    const device = <DeviceRemoved>apiMsg.message
    console.log(`${device.deviceId} removed`)
})

sc.on('connect', async () => {
    console.log('Argos API: [connect]')
    // Get deviceList via request
    const deviceList = await request(API.DEVICE_GET_LIST, API.DEVICE_LIST, {})
    console.log('\ndeviceList received')
    console.log(`${deviceList.length} device(s) found in system\n`)
    if (deviceList.length > 0) {
        for (const device of deviceList) {
            await printDeviceInfo(device)
        }
    }
    if (process.argv.length > 2 && process.argv[2] === '--exit') {
        process.exit(0)
    }
})

// Helper function for request/response type messaging
async function request<T extends keyof ArgosTypesMap, U extends keyof ArgosTypesMap>(
    req: T,
    res: U,
    message: ArgosTypesMap[T]
): Promise<ArgosTypesMap[U]> {
    const resId = uniqid()

    const responseEvent = once(sc, resId)
    sc.emit(req, {
        message: message,
        responseId: resId,
    })
    const [response] = await responseEvent

    switch (response.event) {
        case res:
            return response.message
        case 'timeout':
            throw new Error(`Argos not responding to ${req} request`)
        case 'apiError':
            throw new Error(`Argos responded with apiError for ${req} request`)
        default:
            throw new Error(`Unknown error in response to ${req}`)
    }
}

// Helper function for printing device information
async function printDeviceInfo(device) {
    // Device name is stored in deviceMiscellaneous data. Get it via request
    const deviceMisc = await request(API.DEVICE_GET_MISCELLANEOUS, API.DEVICE_MISCELLANEOUS, {
        deviceId: device.deviceId,
    })

    let deviceName = ''
    for (const misc of deviceMisc.deviceMiscellaneousList) {
        if (misc.deviceMiscellaneousType == 'deviceName') {
            deviceName = misc.deviceMiscellaneousData.deviceName
        }
    }

    // Device name is stored in deviceLocations data. Get it via request
    const deviceLocation = await request(API.DEVICE_GET_LOCATIONS, API.DEVICE_LOCATIONS, {
        deviceId: device.deviceId,
    })
    const deviceGeoLocation = deviceLocation.deviceLocations.find(
        (locElem) => locElem.deviceLocationType == 'deviceGeolocation'
    )

    // Print device info
    let str = `${device.deviceId}\t${deviceName}`
    str += `\t${device.deviceSerialNumber}\t${device.deviceType}`
    str += `\t${deviceGeoLocation.deviceLocationLatitude}\t${deviceGeoLocation.deviceLocationLongitude}`
    console.log(str)
}
