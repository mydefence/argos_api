/// <reference types="node" />
/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
import { io } from 'socket.io-client';
import { EventEmitter } from 'events';
import { ArgosTypesMap } from './argosApi';
/** The default logger used. Implements same interface as `util.format()`.
 * Should be easy to map to e.g. a winston logger. */
declare function default_logger(format?: unknown, ...param: unknown[]): void;
/** The default logger for messages sent and received. */
declare function default_msg_logger<E extends keyof ArgosTypesMap>(event: E, message: ArgosTypesMap[E], direction: '←' | '→'): void;
/** Class wraps socket.io connection to ARGOS server, and exposes the ARGOS API
 * with correct typing.
 * */
export declare class ArgosClient extends EventEmitter {
    ip: string;
    port: string;
    /** Wait for this before sending requests. */
    connectedPromise: Promise<void>;
    /** The socket.io connection to ARGOS. Normally not needed. */
    sc: ReturnType<typeof io>;
    private responseCnt;
    private logger;
    private msg_logger;
    constructor(ip?: string, port?: string, { https, logger, msg_logger, }?: {
        https?: boolean;
        logger?: typeof default_logger;
        msg_logger?: typeof default_msg_logger;
    });
    /** Disconnect from ARGOS. Use only when closing service, connection cannot
     * be re-established.
     * */
    close(): Promise<void>;
    private responseId;
    /** Send message to ARGOS server. Usually you want to use {@link request}
     * instead.
     *
     * The event will be send to ARGOS and to any local listeners.
     *
     * @param event - ARGOS internal or external event
     * @param message - Event data. Type inferred from 'event`
     * */
    emit<E extends keyof ArgosTypesMap>(event: E, message: ArgosTypesMap[E], responseId?: string): boolean;
    /** Listen for messages from ARGOS or emitted locally on in {@link emit}.
     *
     * @param event - ARGOS internal or external event
     * @param message - Event data. Type inferred from 'event`
     * */
    on<E extends keyof ArgosTypesMap>(event: E, callback: (message: ArgosTypesMap[E]) => void): this;
    /** Send a request and return a promise for the response with an optional
     * timeout. Will reject in case of timeout.
     *
     * @example
     * ```
     * const missionCenter = await argos.request(API.MISSION_CENTER_GET, {}, API.MISSION_CENTER)
     * ```
     * */
    request<T extends keyof ArgosTypesMap, U extends keyof ArgosTypesMap>(reqEvent: T, reqData: ArgosTypesMap[T], resEvent: U, timeout?: number): Promise<ArgosTypesMap[U]>;
}
export {};
