/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
import { API, Device, miscellaneousDataFind } from 'argos_types/lib/argosApi'
import { apiLogin, ArgosClient } from 'argos_types/lib/argosClient'

const ARGOS_HOST = 'argos.mydefence.dk'

// Register some process signals for shutting down the process
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.')
    process.exit()
})
process.on('SIGINT', function () {
    console.info('SIGINT signal received.')
    process.exit()
})

async function main() {
    const args = process.argv.slice(2)

    let cookie: string | undefined
    if (!args.includes('--no-login')) {
        cookie = await apiLogin({ host: ARGOS_HOST, username: 'operator', password: '' })
    }

    const argos = new ArgosClient({ host: ARGOS_HOST, cookie })

    // Register listener for Argos push events
    argos.on(API.DEVICE_LIST, (deviceList) => {
        console.log('\ndeviceList received as push message', deviceList)
    })

    argos.on(API.DEVICE_ADDED, (deviceAdded) => {
        console.log('\ndeviceAdded received as push message')
        console.log(`${deviceAdded.deviceId} added`)
    })

    argos.on(API.DEVICE_MISCELLANEOUS, (deviceMisc) => {
        console.log('\ndeviceMiscellaneous received as push message')
        console.log(`${deviceMisc.deviceId} miscellaneous data updated`)
    })

    argos.on(API.DEVICE_LOCATIONS, (deviceLocations) => {
        console.log('\ndeviceLocations received as push message')
        console.log(`${deviceLocations.deviceId} locations updated`)
    })

    argos.on(API.DEVICE_REMOVED, (deviceRemoved) => {
        console.log('\ndeviceRemoved received as push message')
        console.log(`${deviceRemoved.deviceId} removed`)
    })

    argos.connectedPromise.then(async () => {
        console.log('Argos API: [connect]')
        // Get deviceList via request
        const deviceList = await argos.request(API.DEVICE_GET_LIST, {}, API.DEVICE_LIST)
        console.log('\ndeviceList received')
        console.log(`${deviceList.length} device(s) found in system\n`)
        for (const device of deviceList) {
            await printDeviceInfo(device)
        }
        if (args.includes('--exit')) {
            process.exit(0)
        }
    })

    // Helper function for printing device information
    async function printDeviceInfo(device: Device) {
        const deviceId = device.deviceId

        // Device name is stored in deviceMiscellaneous data. Get it via request
        const deviceMisc = await argos.request(API.DEVICE_GET_MISCELLANEOUS, { deviceId }, API.DEVICE_MISCELLANEOUS)

        const deviceName =
            miscellaneousDataFind(deviceMisc.deviceMiscellaneousList, 'deviceName')?.deviceMiscellaneousData
                .deviceName ?? ''

        // Device location is stored in deviceLocations data. Get it via request
        const deviceLocation = await argos.request(API.DEVICE_GET_LOCATIONS, { deviceId }, API.DEVICE_LOCATIONS)
        const deviceGeoLocation = deviceLocation.deviceLocations.find(
            (locElem) => locElem.deviceLocationType == 'deviceGeolocation',
        )

        // Print device info
        let str = `${deviceId}\t${deviceName}`
        str += `\t${device.deviceSerialNumber}\t${device.deviceType}`
        str += `\t${deviceGeoLocation.deviceLocationLatitude}\t${deviceGeoLocation.deviceLocationLongitude}`
        console.log(str)
    }
}

main()
