/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
import { Ajv } from 'ajv';
import addFormats from 'ajv-formats';
import * as fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
// schema is read from api_gateway to simplify argos_types release (without schema stuff)
export const SCHEMA_DIR = '../mdc2_api_gateway/schema';
async function readJsonSchema(filePath) {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}
export async function readArgosSchema() {
    const ajv = new Ajv({ strictTypes: true }); // fail on schema errors
    const moduleDir = path.dirname(fileURLToPath(import.meta.url));
    addFormats(ajv); // add formats such as 'date-time'
    async function readSchemaDir(dir) {
        const files = await fs.readdir(dir, { withFileTypes: true });
        for (const f of files) {
            const fname = path.join(dir, f.name);
            if (f.isDirectory()) {
                await readSchemaDir(fname);
            }
            else if (fname.endsWith('.json')) {
                const fn = path.resolve(moduleDir, '../../', fname);
                const schema = await readJsonSchema(fn);
                const id = fname.split('schema/')[1]; // remove '.../schema/'
                try {
                    ajv.addSchema(schema, id);
                }
                catch (err) {
                    throw new Error(`Schema error in ${fname}: ${err}`, { cause: err });
                }
            }
        }
    }
    const topSchemaPath = path.resolve(moduleDir, '../../', `${SCHEMA_DIR}/Socket_io_message.json`);
    const topSchema = await readJsonSchema(topSchemaPath);
    ajv.addSchema(topSchema, 'argos');
    await readSchemaDir(`${SCHEMA_DIR}/messages`);
    const validate = ajv.getSchema('argos');
    if (!validate) {
        throw new Error('Schema not found');
    }
    if (typeof validate.schema === 'boolean' || '$async' in validate.schema) {
        throw new Error('Unexpected schema type');
    }
    const schema = validate.schema;
    const events = schema['properties']?.['event']?.['enum'];
    if (!events || typeof events !== 'object' || !events.length) {
        throw new Error('No events found in schema');
    }
    return { validate, schema, events, ajv };
}
//# sourceMappingURL=readSchema.js.map