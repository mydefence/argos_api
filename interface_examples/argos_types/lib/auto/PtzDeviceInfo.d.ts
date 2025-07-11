/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export type PtzDeviceInfo = {
    /**
     * The device id. For PTZ devices in composites, this is the id of the child (PTZ) device.
     */
    deviceId: string;
    description?: string;
    /**
     * Current pan value in degrees. Absent if device cannot pan.
     */
    p?: number;
    /**
     * Current tilt value in degrees. Absent if device cannot tilt.
     */
    t?: number;
    /**
     * Current zoom setting. Absent if device cannot zoom.
     */
    z?: {
        /**
         * Percentage of zoom capability. Range: 0 - 1
         */
        pct?: number;
        /**
         * Field of view in degrees. Typically measured horizontally.
         */
        fov?: number;
        /**
         * Vertical field of view in degrees.
         */
        vfov?: number;
    };
    /**
     * Current focus value in percent. Absent if the device cannot focus.
     */
    f?: number;
    /**
     * List the supported velocity units for pan and tilt. Absent if velocity cannot be set. If velocity can be set, "pct" is always supported. "pct" means percent of max joystick movement. It is device dependent how that is translated into velocity, and might e.g. depend on zoom level for cameras. "deg/s" is optional.
     */
    ptUnitsSupported?: ("deg/s" | "pct")[];
    /**
     * If camera tracking can be assigned to sub devices this indicates the chosen sub device.
     */
    trackingSubDevice?: number;
    /**
     * Camera tracking state. Absent if tracking is not supported. `acquire`: search for threats in the video stream and go to track if any is found. `follow`: like acquire but movement controlled using ptzFollowStart. `track`: Camera is automatically tracking a threat and other PTZ movement commands will be ignored.
     */
    tracking?: "disabled" | "acquire" | "follow" | "track";
    /**
     * If tracking produces threat information (device dependent), this is the id of the uthreat basis threat that is being tracked. Valid until tracking!=`track` or a new value is supplied.
     */
    trackingBasisThreatId?: string;
    /**
     * After this many seconds with no movement commands, the PTZ device will reset the orientation to the default (if it has been set). This is the same as setting "default" in ptzMoveAbs. Note: Setting "default" enables auto-focus if supported.
     */
    resetOrientationTimeout?: number | null;
    /**
     * If the device contains independent sub-devices (e.g. a camera with multiple tubes with independent zoom and focus), they are listed here with their independent dimensions
     */
    subDevices?: {
        subDeviceId?: number;
        description?: string;
        p?: number;
        t?: number;
        z?: {
            pct?: number;
            fov?: number;
            vfov?: number;
        };
        f?: number;
    }[];
};
