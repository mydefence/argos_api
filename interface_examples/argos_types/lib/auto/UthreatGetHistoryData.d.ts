/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export type UthreatGetHistoryData = {
    /**
     * Array og unique uthreat ids.
     */
    uthreatIds: string[];
    /**
     * Optional from timestamp to only get history data from this time and onwards. Usefull when response data is limited.
     */
    fromTimestamp?: string;
};
