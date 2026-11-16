export const MISC_SECRET_PATHS = {
    "tlsConfig": [
        "connections.*.clientCredentials.privateKey"
    ]
};
export const MISC_TYPES_WITH_SECRETS = Object.keys(MISC_SECRET_PATHS);
/** Dot-paths (`*` for map keys) whose value is a JSON-schema `oneOf` discriminated
 * union (e.g. branches keyed by a `mode`/`format` const) - device_state replaces the whole
 * object at these paths on merge instead of deep-merging fields across branches. */
export const MISC_UNION_PATHS = {
    "tlsConfig": [
        "connections.*.serverVerification"
    ]
};
//# sourceMappingURL=miscSecretPaths.js.map