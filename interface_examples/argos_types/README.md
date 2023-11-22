# Argos Types
This module contains common types for Argos.

## Files
* argos-api: API interface types auto generated from schema files
* argos-int: Internal types shared between services. Manually maintained

## Install module

Install into the various Argos components using

    pnpm install --save ../argos_types/

## Use module

Typescript examples:

    import { API, DeviceList, RfGeoThreat } from 'argos_types/lib/argos-api'
    import { INTAPI } from 'argos_types/lib/argos-int'
    // Sub types can be accessed using indexing, e.g:
    let myRfGeoThreatsFrequencyInfo: RfGeoThreat['frequencyInfo']

