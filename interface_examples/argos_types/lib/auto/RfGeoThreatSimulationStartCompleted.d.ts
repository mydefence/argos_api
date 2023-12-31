/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
/**
 * The related rfGeoThreatSimulationStart-message has been accepted and a simulation is started. The result of the simulation will be available at a later time in an rfGeoThreatSimulationResult-message.
 */
export type RfGeoThreatSimulationStartCompleted = {
    /**
     * Unique simulation number from rfGeoThreatSimulationRequest.
     */
    simulationNumber: number;
    /**
     * Estimated processing time [s] of simulation. Initial value is a wild guess, but will adapt over time.
     */
    estTime: number;
};
