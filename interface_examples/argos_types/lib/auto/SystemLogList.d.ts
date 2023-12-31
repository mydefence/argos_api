/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export type SystemLogList = SystemLog[];
export type SystemLog = {
    /**
     * The unique ID of this SystemLog event.
     */
    systemLogId: string;
    /**
     * The device id. If omitted the event is regarding the system in general.
     */
    deviceId?: string;
    /**
     * Define the severity of this event with regards to the device. 'Error' if the device is not able to function. 'Warning' is if the event is expected to be temporary or with minor impact on performance.
     */
    severity: "error" | "warning" | "info" | "debug";
    /**
     * Short description of this SystemLog event.
     */
    description: string;
    /**
     * UTC time of creation of this SystemLog event.
     */
    createdTimeStamp: string;
    /**
     * UTC time of updated SystemLog event.
     */
    updatedTimeStamp: string;
    /**
     * UTC time of when the SystemLog event was resolved.
     */
    resolvedTimeStamp?: string;
};
