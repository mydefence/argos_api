/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
export function isAlarmZoneAddCircle(alarmZoneAdd) {
    return alarmZoneAdd.circle !== undefined;
}
export function isAlarmZoneAddPolygon(alarmZoneAdd) {
    return alarmZoneAdd.polygon !== undefined;
}
export function isAlarmZoneCircle(alarmZone) {
    return alarmZone.circle !== undefined;
}
export function isAlarmZonePolygon(alarmZone) {
    return alarmZone.polygon !== undefined;
}
/** Type guard for circular origin filters */
export function isOriginFilterCircle(originFilter) {
    return originFilter.circle !== undefined;
}
/** Type guard for polygon origin filters */
export function isOriginFilterPolygon(originFilter) {
    return originFilter.polygon !== undefined;
}
export function isUthreatPresence(ut) {
    return ut.presence !== undefined;
}
export function isUthreatZone(ut) {
    return ut.zone !== undefined;
}
export function isUthreatDirection(ut) {
    return ut.direction !== undefined;
}
export function isUthreatLocation(ut) {
    return ut.location !== undefined;
}
export function isUthreatBasisPresence(utb) {
    return utb.presence !== undefined;
}
export function isUthreatBasisZone(utb) {
    return utb.zone !== undefined;
}
export function isUthreatBasisDirection(utb) {
    return utb.direction !== undefined;
}
export function isUthreatBasisLocation(utb) {
    return utb.location !== undefined;
}
/** Return string representation of Uthreat/UthreatBasis type */
export function uthreatType(ut) {
    const types = ['presence', 'zone', 'direction', 'location'];
    const type = types.find((type) => type in ut);
    if (!type) {
        throw new Error('Object is not a uthreatBasis: ' + JSON.stringify(ut));
    }
    return type;
}
export function isDeviceMiscellaneousDeviceName(misc) {
    return misc.deviceMiscellaneousType == 'deviceName';
}
export function isDeviceMiscellaneousDeviceOrder(misc) {
    return misc.deviceMiscellaneousType == 'deviceOrder';
}
export function isDeviceMiscellaneousDeviceOrientation(misc) {
    return misc.deviceMiscellaneousType == 'deviceOrientation';
}
export function isDeviceMiscellaneousProductName(misc) {
    return misc.deviceMiscellaneousType == 'productName';
}
export function isDeviceMiscellaneousFrequencyBands(misc) {
    return misc.deviceMiscellaneousType == 'frequencyBands';
}
export function isDeviceMiscellaneousDroneList(misc) {
    return misc.deviceMiscellaneousType == 'droneList';
}
export function isDeviceMiscellaneousUseGPSLocation(misc) {
    return misc.deviceMiscellaneousType == 'useGPSLocation';
}
export function isDeviceMiscellaneousPtzLimits(misc) {
    return misc.deviceMiscellaneousType == 'ptzLimits';
}
export function isDeviceMiscellaneousDeviceRange(misc) {
    return misc.deviceMiscellaneousType == 'deviceRange';
}
export function isDeviceMiscellaneousConfidenceThreshold(misc) {
    return misc.deviceMiscellaneousType == 'confidenceThreshold';
}
export function isDeviceMiscellaneousRingSettings(misc) {
    return misc.deviceMiscellaneousType == 'ringSettings';
}
export function isDeviceMiscellaneousProfiles(misc) {
    return misc.deviceMiscellaneousType == 'profiles';
}
export function isDeviceMiscellaneousTakInfo(misc) {
    return misc.deviceMiscellaneousType == 'takInfo';
}
export function isDeviceMiscellaneousPtzDefaultDistance(misc) {
    return misc.deviceMiscellaneousType == 'ptzDefaultDistance';
}
export function isDeviceMiscellaneousPtzDefaultHeight(misc) {
    return misc.deviceMiscellaneousType == 'ptzDefaultHeight';
}
export function isDeviceMiscellaneousNominalTargetSize(misc) {
    return misc.deviceMiscellaneousType == 'nominalTargetSize';
}
export function isDeviceMiscellaneousEcmChannels(misc) {
    return misc.deviceMiscellaneousType == 'ecmChannels';
}
/** Search miscellaneous data list and narrow to the requested type. */
export function miscellaneousDataFind(deviceMiscellaneousList, miscType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return deviceMiscellaneousList.find((misc) => misc.deviceMiscellaneousType == miscType);
}
export function isPtzMoveAbsOrientation(p) {
    return p.orientation !== undefined;
}
export function isPtzMoveAbsPosition(p) {
    return p.position !== undefined;
}
/** Check if device is a PTZ device
 *
 * @param device Argos device info
 * @returns true if device is a PTZ device, false otherwise
 */
export function isPtz(device) {
    switch (device.deviceType) {
        case 'blackbird':
        case 'blackbird5k':
        case 'jaegar':
        case 'onvif':
        case 'visionflex':
        case 'circleScope':
            return true;
        case 'composite':
            return device.devices.some(isPtz);
        default:
            return false;
    }
}
/** Returns list of all leaf devices, i.e. children of a composite, or the
 * device itself for single devices. */
export function leafDevices(device) {
    return device.devices.length ? device.devices : [device];
}
//# sourceMappingURL=argosApiManual.js.map