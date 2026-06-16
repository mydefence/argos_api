/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
import { Ajv, SchemaObject, ValidateFunction } from 'ajv';
export type { Ajv, SchemaObject, ValidateFunction } from 'ajv';
export declare const SCHEMA_DIR = "../mdc2_api_gateway/schema";
export declare function readArgosSchema(): Promise<{
    validate: ValidateFunction;
    schema: SchemaObject;
    events: string[];
    ajv: Ajv;
}>;
