/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * A unique FWU image identification, generated automatically by the system
 */
export type FWUImageIdentification = string;
/**
 * The type of FWU image
 */
export type FWUImageType = "rfSensor" | "rfEffector";
/**
 * Version of the FWU image
 */
export type FWUImageVersion = string;
export type FwuImage = {
    fwuImageId: FWUImageIdentification;
    type: FWUImageType;
    version: FWUImageVersion;
};