/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
/** If property `key` is not present in `obj` it is added with the value
 * `value`.
 *
 * Use this when you need typescript to understand, that `key` is present in
 * `obj`
 *
 * @param obj The object to add the property to.
 * @param key The property to add. Is must be an optional property of `obj`.
 * @param value The value to add.
 */
export function addPropIfMissing(obj, key, value) {
    if (!(key in obj)) {
        Object.assign(obj, { [key]: value });
    }
}
/** Helper function to create an error {@link Result} */
export function Err(errorInfo) {
    return { err: { errorInfo } };
}
/** Helper function to create a success {@link Result} */
export function Ok(res) {
    return { res };
}
//# sourceMappingURL=tsUtil.js.map