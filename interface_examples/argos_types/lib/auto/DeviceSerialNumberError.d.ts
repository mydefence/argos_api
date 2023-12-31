/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * A unique device serialnumber either received from the device itself if autodetected, if manually created from the input received and on a composite device it's the same as the deviceId.
 */
export type DeviceSerialnumber = string;
/**
 * A description of what error has occurred and e.g. any identification needed in relation to the error.
 */
export type ErrorInformationDeviceIdentification = string;
export type DeviceSerialNumberError = {
    deviceSerialNumber: DeviceSerialnumber;
    errorInfo: ErrorInformationDeviceIdentification;
};
