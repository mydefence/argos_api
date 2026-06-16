/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
/** Make properties K in T optional */
export type OptionalField<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
/** Make properties K in T required. */
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;
/** Make properties K in T nullable. */
export type NullableField<T, K extends keyof T> = Omit<T, K> & {
    [P in K]: T[P] | null;
};
/** Create type based on T, where the keys K are required, and the rest
 * optional*/
export type RequiredBy<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
/**
 * Create type based on T, where all properties and nested propeties are
 * requried.
 */
export type DeepRequired<T> = Required<{
    [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>;
}>;
/** Convert an event map type, e.g.:
 * ```
 * type SkyTrackMap = {
 *     trackConfig: SkyTrackConfig
 *     aiConfig: SkyAiConfig
 *     ...
 * }
 * ```
 * into the format required by typed-emitter, e.g.:
 * ```
 * type SkyTrackEvents = {
 *     trackConfig: (data: SkyTrackConfig) => void
 *     aiConfig: (data: SkyAiConfig) => void
 *     ...
 * }
 * ```
 * Example:
 * ```
 * type SkyTrackEvents = EventTypes<SkyTrackMap>
 * ```
 */
export type EventTypes<T> = {
    [P in keyof T]: (data: T[P]) => void;
};
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
export declare function addPropIfMissing<T extends object, K extends keyof T, V extends Required<T[K]>>(obj: T, key: K, value: V): asserts obj is T & {
    [P in K]: V;
};
type ResultError = {
    res?: never;
    err: {
        errorInfo: string;
    };
};
type ResultOk<T> = {
    res: T;
    err?: never;
};
/** Wrapper for error handling. Use with {@link Err} and {@link Ok}.
 *
 * Example function:
 * ```
 * function div(a, b): Result<number> {
 *     if (b === 0) {
 *         return Err("Division by zero")
 *     }
 *     return Ok(a / b)
 * }
 * ```
 * Example of basic usage:
 * ```
 * const {res, err} = div(1, 0)
 * if (err) {
 *     return
 * }
 * console.log(res) // res is `number`
 * ```
 *
 * Example of function with error propagation:
 * ```
 * function divToText(a, b): Result<string> {
 *   const {res, err} = div(a, b)
 *   if (err) return { err }
 *   // type of res is `number`
 *   return Ok(`Result is ${res}`)
 * ```
 * */
export type Result<T> = ResultOk<T> | ResultError;
/** Helper function to create an error {@link Result} */
export declare function Err(errorInfo: string): ResultError;
/** Helper function to create a success {@link Result} */
export declare function Ok<T>(res: T): ResultOk<T>;
export {};
