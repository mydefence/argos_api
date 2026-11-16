/** Scans `*Base.json` sources under deviceMiscellaneous (the hand-maintained, unmasked schemas
 * for misc types with secret fields - see `doc/json/schema_generator/miscChange.ts`) for
 * `"$comment": "secret"` field paths, and emits the matching `ts_src/auto/miscSecretPaths.ts` TS
 * constants directly for device_state to mask/split secret misc fields - no intermediate JSON
 * artifact, and nothing added to the public schema. Also compiles each `*Base.json` (the real,
 * unmasked shape) into its own type, since the regular `DeviceMiscellaneousXxx` type (compiled
 * from the narrowed, generated output schema) only allows the masked placeholder for secret
 * fields. */
export declare function generateMiscSecretPaths(): Promise<void>;
