"use strict";
/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.leafDevices = exports.isPtz = exports.isPtzMoveAbsPosition = exports.isPtzMoveAbsOrientation = exports.miscellaneousDataFind = exports.isDeviceMiscellaneousProfiles = exports.isDeviceMiscellaneousRingSettings = exports.isDeviceMiscellaneousConfidenceThreshold = exports.isDeviceMiscellaneousDeviceRange = exports.isDeviceMiscellaneousPtzLimits = exports.isDeviceMiscellaneousUseGPSLocation = exports.isDeviceMiscellaneousDroneList = exports.isDeviceMiscellaneousFrequencyBands = exports.isDeviceMiscellaneousProductName = exports.isDeviceMiscellaneousDeviceOrientation = exports.isDeviceMiscellaneousDeviceOrder = exports.isDeviceMiscellaneousDeviceName = exports.uthreatType = exports.isUthreatBasisLocation = exports.isUthreatBasisDirection = exports.isUthreatBasisZone = exports.isUthreatBasisPresence = exports.isUthreatLocation = exports.isUthreatDirection = exports.isUthreatZone = exports.isUthreatPresence = exports.isOriginFilterPolygon = exports.isOriginFilterCircle = exports.isAlarmZonePolygon = exports.isAlarmZoneCircle = exports.isAlarmZoneAddPolygon = exports.isAlarmZoneAddCircle = void 0;
function isAlarmZoneAddCircle(alarmZoneAdd) {
    return alarmZoneAdd.circle !== undefined;
}
exports.isAlarmZoneAddCircle = isAlarmZoneAddCircle;
function isAlarmZoneAddPolygon(alarmZoneAdd) {
    return alarmZoneAdd.polygon !== undefined;
}
exports.isAlarmZoneAddPolygon = isAlarmZoneAddPolygon;
function isAlarmZoneCircle(alarmZone) {
    return alarmZone.circle !== undefined;
}
exports.isAlarmZoneCircle = isAlarmZoneCircle;
function isAlarmZonePolygon(alarmZone) {
    return alarmZone.polygon !== undefined;
}
exports.isAlarmZonePolygon = isAlarmZonePolygon;
/** Type guard for circular origin filters */
function isOriginFilterCircle(originFilter) {
    return originFilter.circle !== undefined;
}
exports.isOriginFilterCircle = isOriginFilterCircle;
/** Type guard for polygon origin filters */
function isOriginFilterPolygon(originFilter) {
    return originFilter.polygon !== undefined;
}
exports.isOriginFilterPolygon = isOriginFilterPolygon;
function isUthreatPresence(ut) {
    return ut.presence !== undefined;
}
exports.isUthreatPresence = isUthreatPresence;
function isUthreatZone(ut) {
    return ut.zone !== undefined;
}
exports.isUthreatZone = isUthreatZone;
function isUthreatDirection(ut) {
    return ut.direction !== undefined;
}
exports.isUthreatDirection = isUthreatDirection;
function isUthreatLocation(ut) {
    return ut.location !== undefined;
}
exports.isUthreatLocation = isUthreatLocation;
function isUthreatBasisPresence(utb) {
    return utb.presence !== undefined;
}
exports.isUthreatBasisPresence = isUthreatBasisPresence;
function isUthreatBasisZone(utb) {
    return utb.zone !== undefined;
}
exports.isUthreatBasisZone = isUthreatBasisZone;
function isUthreatBasisDirection(utb) {
    return utb.direction !== undefined;
}
exports.isUthreatBasisDirection = isUthreatBasisDirection;
function isUthreatBasisLocation(utb) {
    return utb.location !== undefined;
}
exports.isUthreatBasisLocation = isUthreatBasisLocation;
/** Return string representation of Uthreat/UthreatBasis type */
function uthreatType(ut) {
    const types = ['presence', 'zone', 'direction', 'location'];
    const type = types.find((type) => type in ut);
    if (!type) {
        throw new Error('Object is not a uthreatBasis: ' + JSON.stringify(ut));
    }
    return type;
}
exports.uthreatType = uthreatType;
function isDeviceMiscellaneousDeviceName(misc) {
    return misc.deviceMiscellaneousType == 'deviceName';
}
exports.isDeviceMiscellaneousDeviceName = isDeviceMiscellaneousDeviceName;
function isDeviceMiscellaneousDeviceOrder(misc) {
    return misc.deviceMiscellaneousType == 'deviceOrder';
}
exports.isDeviceMiscellaneousDeviceOrder = isDeviceMiscellaneousDeviceOrder;
function isDeviceMiscellaneousDeviceOrientation(misc) {
    return misc.deviceMiscellaneousType == 'deviceOrientation';
}
exports.isDeviceMiscellaneousDeviceOrientation = isDeviceMiscellaneousDeviceOrientation;
function isDeviceMiscellaneousProductName(misc) {
    return misc.deviceMiscellaneousType == 'productName';
}
exports.isDeviceMiscellaneousProductName = isDeviceMiscellaneousProductName;
function isDeviceMiscellaneousFrequencyBands(misc) {
    return misc.deviceMiscellaneousType == 'frequencyBands';
}
exports.isDeviceMiscellaneousFrequencyBands = isDeviceMiscellaneousFrequencyBands;
function isDeviceMiscellaneousDroneList(misc) {
    return misc.deviceMiscellaneousType == 'droneList';
}
exports.isDeviceMiscellaneousDroneList = isDeviceMiscellaneousDroneList;
function isDeviceMiscellaneousUseGPSLocation(misc) {
    return misc.deviceMiscellaneousType == 'useGPSLocation';
}
exports.isDeviceMiscellaneousUseGPSLocation = isDeviceMiscellaneousUseGPSLocation;
function isDeviceMiscellaneousPtzLimits(misc) {
    return misc.deviceMiscellaneousType == 'ptzLimits';
}
exports.isDeviceMiscellaneousPtzLimits = isDeviceMiscellaneousPtzLimits;
function isDeviceMiscellaneousDeviceRange(misc) {
    return misc.deviceMiscellaneousType == 'deviceRange';
}
exports.isDeviceMiscellaneousDeviceRange = isDeviceMiscellaneousDeviceRange;
function isDeviceMiscellaneousConfidenceThreshold(misc) {
    return misc.deviceMiscellaneousType == 'confidenceThreshold';
}
exports.isDeviceMiscellaneousConfidenceThreshold = isDeviceMiscellaneousConfidenceThreshold;
function isDeviceMiscellaneousRingSettings(misc) {
    return misc.deviceMiscellaneousType == 'ringSettings';
}
exports.isDeviceMiscellaneousRingSettings = isDeviceMiscellaneousRingSettings;
function isDeviceMiscellaneousProfiles(misc) {
    return misc.deviceMiscellaneousType == 'profiles';
}
exports.isDeviceMiscellaneousProfiles = isDeviceMiscellaneousProfiles;
/** Search miscellaneous data list and narrow to the requested type. */
function miscellaneousDataFind(deviceMiscellaneousList, miscType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return deviceMiscellaneousList.find((misc) => misc.deviceMiscellaneousType == miscType);
}
exports.miscellaneousDataFind = miscellaneousDataFind;
function isPtzMoveAbsOrientation(p) {
    return p.orientation !== undefined;
}
exports.isPtzMoveAbsOrientation = isPtzMoveAbsOrientation;
function isPtzMoveAbsPosition(p) {
    return p.position !== undefined;
}
exports.isPtzMoveAbsPosition = isPtzMoveAbsPosition;
/** Check if device is a PTZ device
 *
 * @param device Argos device info
 * @returns true if device is a PTZ device, false otherwise
 */
function isPtz(device) {
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
exports.isPtz = isPtz;
/** Returns list of all leaf devices, i.e. children of a composite, or the
 * device itself for single devices. */
function leafDevices(device) {
    return device.devices.length ? device.devices : [device];
}
exports.leafDevices = leafDevices;
//# sourceMappingURL=argosApiManual.js.map