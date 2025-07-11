/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * Defines a bounding box around drone detections in a video stream
 */
export type VmsBoundingBox = {
    /**
     * VMS stream identification
     */
    vmsStreamId: string;
    /**
     * Unique identifier for the bounding box
     */
    boundingBoxId: string;
    /**
     * Uthreat basis ID of the threat inside the bounding box.
     */
    basisThreatId?: string;
    /**
     * Unit: pixels relative to top left corner
     */
    boundingBox: {
        /**
         * Top left X coordinate of the bounding box
         */
        leftX: number;
        /**
         * Top left Y coordinate of the bounding box
         */
        topY: number;
        /**
         * Width of the bounding box (X dimension)
         */
        width: number;
        /**
         * Height of the bounding box (Y dimension)
         */
        height: number;
    };
};
