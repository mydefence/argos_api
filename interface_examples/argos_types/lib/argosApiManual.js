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
exports.isAlarmZoneAddCircle = isAlarmZoneAddCircle;
exports.isAlarmZoneAddPolygon = isAlarmZoneAddPolygon;
exports.isAlarmZoneCircle = isAlarmZoneCircle;
exports.isAlarmZonePolygon = isAlarmZonePolygon;
exports.isOriginFilterCircle = isOriginFilterCircle;
exports.isOriginFilterPolygon = isOriginFilterPolygon;
exports.isUthreatPresence = isUthreatPresence;
exports.isUthreatZone = isUthreatZone;
exports.isUthreatDirection = isUthreatDirection;
exports.isUthreatLocation = isUthreatLocation;
exports.isUthreatBasisPresence = isUthreatBasisPresence;
exports.isUthreatBasisZone = isUthreatBasisZone;
exports.isUthreatBasisDirection = isUthreatBasisDirection;
exports.isUthreatBasisLocation = isUthreatBasisLocation;
exports.uthreatType = uthreatType;
exports.isDeviceMiscellaneousDeviceName = isDeviceMiscellaneousDeviceName;
exports.isDeviceMiscellaneousDeviceOrder = isDeviceMiscellaneousDeviceOrder;
exports.isDeviceMiscellaneousDeviceOrientation = isDeviceMiscellaneousDeviceOrientation;
exports.isDeviceMiscellaneousProductName = isDeviceMiscellaneousProductName;
exports.isDeviceMiscellaneousFrequencyBands = isDeviceMiscellaneousFrequencyBands;
exports.isDeviceMiscellaneousDroneList = isDeviceMiscellaneousDroneList;
exports.isDeviceMiscellaneousUseGPSLocation = isDeviceMiscellaneousUseGPSLocation;
exports.isDeviceMiscellaneousPtzLimits = isDeviceMiscellaneousPtzLimits;
exports.isDeviceMiscellaneousDeviceRange = isDeviceMiscellaneousDeviceRange;
exports.isDeviceMiscellaneousConfidenceThreshold = isDeviceMiscellaneousConfidenceThreshold;
exports.isDeviceMiscellaneousRingSettings = isDeviceMiscellaneousRingSettings;
exports.isDeviceMiscellaneousProfiles = isDeviceMiscellaneousProfiles;
exports.isDeviceMiscellaneousTakInfo = isDeviceMiscellaneousTakInfo;
exports.isDeviceMiscellaneousPtzDefaultDistance = isDeviceMiscellaneousPtzDefaultDistance;
exports.isDeviceMiscellaneousPtzDefaultHeight = isDeviceMiscellaneousPtzDefaultHeight;
exports.isDeviceMiscellaneousNominalTargetSize = isDeviceMiscellaneousNominalTargetSize;
exports.miscellaneousDataFind = miscellaneousDataFind;
exports.isPtzMoveAbsOrientation = isPtzMoveAbsOrientation;
exports.isPtzMoveAbsPosition = isPtzMoveAbsPosition;
exports.isPtz = isPtz;
exports.leafDevices = leafDevices;
function isAlarmZoneAddCircle(alarmZoneAdd) {
    return alarmZoneAdd.circle !== undefined;
}
function isAlarmZoneAddPolygon(alarmZoneAdd) {
    return alarmZoneAdd.polygon !== undefined;
}
function isAlarmZoneCircle(alarmZone) {
    return alarmZone.circle !== undefined;
}
function isAlarmZonePolygon(alarmZone) {
    return alarmZone.polygon !== undefined;
}
/** Type guard for circular origin filters */
function isOriginFilterCircle(originFilter) {
    return originFilter.circle !== undefined;
}
/** Type guard for polygon origin filters */
function isOriginFilterPolygon(originFilter) {
    return originFilter.polygon !== undefined;
}
function isUthreatPresence(ut) {
    return ut.presence !== undefined;
}
function isUthreatZone(ut) {
    return ut.zone !== undefined;
}
function isUthreatDirection(ut) {
    return ut.direction !== undefined;
}
function isUthreatLocation(ut) {
    return ut.location !== undefined;
}
function isUthreatBasisPresence(utb) {
    return utb.presence !== undefined;
}
function isUthreatBasisZone(utb) {
    return utb.zone !== undefined;
}
function isUthreatBasisDirection(utb) {
    return utb.direction !== undefined;
}
function isUthreatBasisLocation(utb) {
    return utb.location !== undefined;
}
/** Return string representation of Uthreat/UthreatBasis type */
function uthreatType(ut) {
    const types = ['presence', 'zone', 'direction', 'location'];
    const type = types.find((type) => type in ut);
    if (!type) {
        throw new Error('Object is not a uthreatBasis: ' + JSON.stringify(ut));
    }
    return type;
}
function isDeviceMiscellaneousDeviceName(misc) {
    return misc.deviceMiscellaneousType == 'deviceName';
}
function isDeviceMiscellaneousDeviceOrder(misc) {
    return misc.deviceMiscellaneousType == 'deviceOrder';
}
function isDeviceMiscellaneousDeviceOrientation(misc) {
    return misc.deviceMiscellaneousType == 'deviceOrientation';
}
function isDeviceMiscellaneousProductName(misc) {
    return misc.deviceMiscellaneousType == 'productName';
}
function isDeviceMiscellaneousFrequencyBands(misc) {
    return misc.deviceMiscellaneousType == 'frequencyBands';
}
function isDeviceMiscellaneousDroneList(misc) {
    return misc.deviceMiscellaneousType == 'droneList';
}
function isDeviceMiscellaneousUseGPSLocation(misc) {
    return misc.deviceMiscellaneousType == 'useGPSLocation';
}
function isDeviceMiscellaneousPtzLimits(misc) {
    return misc.deviceMiscellaneousType == 'ptzLimits';
}
function isDeviceMiscellaneousDeviceRange(misc) {
    return misc.deviceMiscellaneousType == 'deviceRange';
}
function isDeviceMiscellaneousConfidenceThreshold(misc) {
    return misc.deviceMiscellaneousType == 'confidenceThreshold';
}
function isDeviceMiscellaneousRingSettings(misc) {
    return misc.deviceMiscellaneousType == 'ringSettings';
}
function isDeviceMiscellaneousProfiles(misc) {
    return misc.deviceMiscellaneousType == 'profiles';
}
function isDeviceMiscellaneousTakInfo(misc) {
    return misc.deviceMiscellaneousType == 'takInfo';
}
function isDeviceMiscellaneousPtzDefaultDistance(misc) {
    return misc.deviceMiscellaneousType == 'ptzDefaultDistance';
}
function isDeviceMiscellaneousPtzDefaultHeight(misc) {
    return misc.deviceMiscellaneousType == 'ptzDefaultHeight';
}
function isDeviceMiscellaneousNominalTargetSize(misc) {
    return misc.deviceMiscellaneousType == 'nominalTargetSize';
}
/** Search miscellaneous data list and narrow to the requested type. */
function miscellaneousDataFind(deviceMiscellaneousList, miscType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return deviceMiscellaneousList.find((misc) => misc.deviceMiscellaneousType == miscType);
}
function isPtzMoveAbsOrientation(p) {
    return p.orientation !== undefined;
}
function isPtzMoveAbsPosition(p) {
    return p.position !== undefined;
}
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
/** Returns list of all leaf devices, i.e. children of a composite, or the
 * device itself for single devices. */
function leafDevices(device) {
    return device.devices.length ? device.devices : [device];
}
//# sourceMappingURL=argosApiManual.js.map