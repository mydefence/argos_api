/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * Device ID of a PTZ device
 */
export type PTZFollowInstanceIdentification = string;
/**
 * Device ID of a PTZ device used for following
 */
export type DeviceIdentification = string;
/**
 * uthreat ID of threat to follow
 */
export type UthreatDeviceIdentification = string;
/**
 * Device ID of device to follow (e.g. GPS)
 */
export type DeviceIdentification1 = string;
export type PtzFollowList = PtzFollow[];
export type PtzFollow = {
    ptzFollowId: PTZFollowInstanceIdentification;
    deviceId: DeviceIdentification;
    followUthreatId?: UthreatDeviceIdentification;
    followDeviceId?: DeviceIdentification1;
};
