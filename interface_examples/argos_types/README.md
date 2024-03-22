# Argos Types

This module contains common types for Argos.

## Files

-   argosApi: API interface types auto generated from schema files

## Install module

Install into the various Argos components using

    pnpm install --save ../argos_types/

## Use module

Typescript examples:

    import { API, DeviceList, RfGeoThreat } from 'argos_types/lib/argosApi'
    // Sub types can be accessed using indexing, e.g:
    let myRfGeoThreatsFrequencyInfo: RfGeoThreat['frequencyInfo']
