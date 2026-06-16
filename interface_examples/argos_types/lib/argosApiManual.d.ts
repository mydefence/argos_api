/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
/**
 * Note: Everything in here is re-exported from argosApi.ts, so you never need
 * to import this file.
 * */
import { Device } from './auto/Device.js';
export { FrequencyBand } from './auto/DeviceMiscellaneousInfo.js';
export { UserCapability } from './auto/UserWelcome.js';
export { TakTransportOptionsConfigure } from './auto/TakConfigure.js';
export { DeviceState, DeviceType } from './auto/Device.js';
import { AlarmZoneAdd, AlarmZoneAddCircle, AlarmZoneAddPolygon } from './auto/AlarmZoneAdd.js';
export { AlarmZoneAddCircle, AlarmZoneAddPolygon } from './auto/AlarmZoneAdd.js';
export declare function isAlarmZoneAddCircle(alarmZoneAdd: AlarmZoneAdd): alarmZoneAdd is AlarmZoneAddCircle;
export declare function isAlarmZoneAddPolygon(alarmZoneAdd: AlarmZoneAdd): alarmZoneAdd is AlarmZoneAddPolygon;
import { AlarmZone, AlarmZoneCircle, AlarmZonePolygon } from './auto/AlarmZone.js';
export { AlarmZoneCircle, AlarmZonePolygon } from './auto/AlarmZone.js';
export declare function isAlarmZoneCircle(alarmZone: AlarmZone): alarmZone is AlarmZoneCircle;
export declare function isAlarmZonePolygon(alarmZone: AlarmZone): alarmZone is AlarmZonePolygon;
import { OriginFilter, OriginFilterPolygon, OriginFilterCircle } from './auto/OriginFilter.js';
export { OriginFilter, OriginFilterPolygon, OriginFilterCircle } from './auto/OriginFilter.js';
/** Type guard for circular origin filters */
export declare function isOriginFilterCircle(originFilter: OriginFilter): originFilter is OriginFilterCircle;
/** Type guard for polygon origin filters */
export declare function isOriginFilterPolygon(originFilter: OriginFilter): originFilter is OriginFilterPolygon;
import { Uthreat, UthreatPresence, UthreatZone, UthreatDirection, UthreatLocation, UthreatBasis, UthreatBasisPresence, UthreatBasisZone, UthreatBasisDirection, UthreatBasisLocation } from './auto/Uthreat.js';
export { UthreatPresence, UthreatZone, UthreatDirection, UthreatLocation, UthreatBasis, UthreatBasisPresence, UthreatBasisZone, UthreatBasisDirection, UthreatBasisLocation, Affiliation, AffiliationOrFalse, } from './auto/Uthreat.js';
export declare function isUthreatPresence(ut: Uthreat): ut is UthreatPresence;
export declare function isUthreatZone(ut: Uthreat): ut is UthreatZone;
export declare function isUthreatDirection(ut: Uthreat): ut is UthreatDirection;
export declare function isUthreatLocation(ut: Uthreat): ut is UthreatLocation;
export declare function isUthreatBasisPresence(utb: UthreatBasis): utb is UthreatBasisPresence;
export declare function isUthreatBasisZone(utb: UthreatBasis): utb is UthreatBasisZone;
export declare function isUthreatBasisDirection(utb: UthreatBasis): utb is UthreatBasisDirection;
export declare function isUthreatBasisLocation(utb: UthreatBasis): utb is UthreatBasisLocation;
/** Return string representation of Uthreat/UthreatBasis type */
export declare function uthreatType(ut: Uthreat | UthreatBasis): 'presence' | 'zone' | 'direction' | 'location';
import { DeviceMiscellaneousInfo, DeviceMiscellaneousDeviceName, DeviceMiscellaneousDeviceOrder, DeviceMiscellaneousDeviceOrientation, DeviceMiscellaneousProductName, DeviceMiscellaneousFrequencyBands, DeviceMiscellaneousDroneList, DeviceMiscellaneousUseGPSLocation, DeviceMiscellaneousPtzLimits, DeviceMiscellaneousDeviceRange, DeviceMiscellaneousConfidenceThreshold, DeviceMiscellaneousRingSettings, DeviceMiscellaneousType, DeviceMiscellaneousProfiles, DeviceMiscellaneousTakInfo, DeviceMiscellaneousPtzDefaultDistance, DeviceMiscellaneousPtzDefaultHeight, DeviceMiscellaneousNominalTargetSize, DeviceMiscellaneousEcmChannels, DeviceMiscellaneousAssetData } from './auto/DeviceMiscellaneousInfo.js';
export { DeviceMiscellaneousInfo, DeviceMiscellaneousType, DeviceMiscellaneousDeviceName, DeviceMiscellaneousDeviceOrder, DeviceMiscellaneousDeviceOrientation, DeviceMiscellaneousProductName, DeviceMiscellaneousFrequencyBands, DeviceMiscellaneousDroneList, DeviceMiscellaneousUseGPSLocation, DeviceMiscellaneousPtzLimits, DeviceMiscellaneousDeviceRange, DeviceMiscellaneousConfidenceThreshold, DeviceMiscellaneousRingSettings, DeviceMiscellaneousProfiles, DeviceMiscellaneousTakInfo, DeviceMiscellaneousPtzDefaultDistance, DeviceMiscellaneousPtzDefaultHeight, DeviceMiscellaneousNominalTargetSize, DeviceMiscellaneousEcmChannels, DeviceMiscellaneousAssetData, } from './auto/DeviceMiscellaneousInfo.js';
export { DeviceMiscellaneousChange, DeviceMiscellaneousDeviceNameChange, DeviceMiscellaneousDeviceOrderChange, DeviceMiscellaneousDeviceOrientationChange, DeviceMiscellaneousProductNameChange, DeviceMiscellaneousFrequencyBandsChange, DeviceMiscellaneousUseGPSLocationChange, DeviceMiscellaneousPtzLimitsChange, DeviceMiscellaneousDeviceRangeChange, DeviceMiscellaneousConfidenceThresholdChange, DeviceMiscellaneousRingSettingsChange, DeviceMiscellaneousProfilesChange, DeviceMiscellaneousTakInfoChange, DeviceMiscellaneousPtzDefaultDistanceChange, DeviceMiscellaneousPtzDefaultHeightChange, DeviceMiscellaneousNominalTargetSizeChange, DeviceMiscellaneousEcmChannelsChange, DeviceMiscellaneousAssetDataChange, } from './auto/DeviceMiscellaneousChange.js';
export type { SiteTunerParamConfig, SiteTunerFlags } from './auto/SiteTunerConfiguration.js';
export type { SiteTunerStatistics, SiteTunerDetectionStats } from './auto/SiteTunerCalcStatsResult.js';
export declare function isDeviceMiscellaneousDeviceName(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousDeviceName;
export declare function isDeviceMiscellaneousDeviceOrder(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousDeviceOrder;
export declare function isDeviceMiscellaneousDeviceOrientation(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousDeviceOrientation;
export declare function isDeviceMiscellaneousProductName(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousProductName;
export declare function isDeviceMiscellaneousFrequencyBands(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousFrequencyBands;
export declare function isDeviceMiscellaneousDroneList(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousDroneList;
export declare function isDeviceMiscellaneousUseGPSLocation(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousUseGPSLocation;
export declare function isDeviceMiscellaneousPtzLimits(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousPtzLimits;
export declare function isDeviceMiscellaneousDeviceRange(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousDeviceRange;
export declare function isDeviceMiscellaneousConfidenceThreshold(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousConfidenceThreshold;
export declare function isDeviceMiscellaneousRingSettings(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousRingSettings;
export declare function isDeviceMiscellaneousProfiles(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousProfiles;
export declare function isDeviceMiscellaneousTakInfo(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousTakInfo;
export declare function isDeviceMiscellaneousPtzDefaultDistance(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousPtzDefaultDistance;
export declare function isDeviceMiscellaneousPtzDefaultHeight(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousPtzDefaultHeight;
export declare function isDeviceMiscellaneousNominalTargetSize(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousNominalTargetSize;
export declare function isDeviceMiscellaneousEcmChannels(misc: DeviceMiscellaneousInfo): misc is DeviceMiscellaneousEcmChannels;
/** Search miscellaneous data list and narrow to the requested type. */
export declare function miscellaneousDataFind<T extends DeviceMiscellaneousType>(deviceMiscellaneousList: DeviceMiscellaneousInfo[], miscType: T): (DeviceMiscellaneousInfo & {
    deviceMiscellaneousType: T;
}) | undefined;
export type DeviceMiscellaneousTypeMap = {
    deviceName: DeviceMiscellaneousDeviceName;
    productName: DeviceMiscellaneousDeviceOrder;
    deviceOrientation: DeviceMiscellaneousDeviceOrientation;
    deviceOrder: DeviceMiscellaneousProductName;
    frequencyBands: DeviceMiscellaneousFrequencyBands;
    droneList: DeviceMiscellaneousDroneList;
    useGPSLocation: DeviceMiscellaneousUseGPSLocation;
    ptzLimits: DeviceMiscellaneousPtzLimits;
    deviceRange: DeviceMiscellaneousDeviceRange;
    confidenceThreshold: DeviceMiscellaneousConfidenceThreshold;
    ringSettings: DeviceMiscellaneousRingSettings;
    profiles: DeviceMiscellaneousProfiles;
    takInfo: DeviceMiscellaneousTakInfo;
    ptzDefaultDistance: DeviceMiscellaneousPtzDefaultDistance;
    ptzDefaultHeight: DeviceMiscellaneousPtzDefaultHeight;
    nominalTargetSize: DeviceMiscellaneousNominalTargetSize;
    ecmChannels: DeviceMiscellaneousEcmChannels;
    assetData: DeviceMiscellaneousAssetData;
};
import { PtzMoveAbs, PtzMoveAbsOrientation, PtzMoveAbsPosition } from './auto/PtzMoveAbs.js';
import { ArgosTypesMap } from './argosApi.js';
export { PtzMoveAbsOrientation, PtzMoveAbsPosition } from './auto/PtzMoveAbs.js';
export declare function isPtzMoveAbsOrientation(p: PtzMoveAbs): p is PtzMoveAbsOrientation;
export declare function isPtzMoveAbsPosition(p: PtzMoveAbs): p is PtzMoveAbsPosition;
/** Check if device is a PTZ device
 *
 * @param device Argos device info
 * @returns true if device is a PTZ device, false otherwise
 */
export declare function isPtz(device: Device): boolean;
/** Messages to ARGOS (socket.io request) */
export type ArgosReq = {
    message: ArgosTypesMap[keyof ArgosTypesMap];
    responseId: string;
};
/** Helper to convert message map type to argos message types */
type ArgosResMap<T> = {
    [K in keyof T]: {
        event: K;
        message: T[K];
    };
}[keyof T];
/** Messages from ARGOS (socket.io response or push) */
export type ArgosRes = ArgosResMap<ArgosTypesMap>;
/** Returns list of all leaf devices, i.e. children of a composite, or the
 * device itself for single devices. */
export declare function leafDevices(device: Device): Device[];
