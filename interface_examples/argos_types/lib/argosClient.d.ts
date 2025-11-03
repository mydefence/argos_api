/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
import { Socket } from 'socket.io-client';
import { EventEmitter } from 'events';
import { ArgosTypesMap } from './argosApi';
/** The default logger used. Implements same interface as `util.format()`.
 * Should be easy to map to e.g. a winston logger. */
declare function default_logger(format?: unknown, ...param: unknown[]): void;
/** The default logger for messages sent and received. Direction for
 * request/response pattern will show '←R', 'R→', and push messages from ARGOS
 * API will show 'P→' */
declare function default_msg_logger<E extends keyof ArgosTypesMap>(event: E, message: ArgosTypesMap[E], direction: '←R' | 'R→' | 'P→'): void;
/** Login on login REST endpoint and return login token from cookie. Cookie is
 * normally stored in a browser cookie. */
export declare function apiLogin({ host, port, username, password, }: {
    host?: string;
    port?: string;
    username: string;
    password: string;
}): Promise<string>;
/** Class wraps socket.io connection to ARGOS server, and exposes the ARGOS API
 * with correct typing.
 * */
export declare class ArgosClient extends EventEmitter {
    /** Wait for this before sending requests. Authentication errors are not
     * expected to go away, so causes reject. Other errors causes retry and
     * promise stays pending. */
    connectedPromise: Promise<void>;
    /** The socket.io connection to ARGOS. Normally not needed. */
    sc: Socket;
    private responseCnt;
    private logger;
    private msg_logger;
    /**
     * Creates an instance of ArgosClient.
     * @param options - Configuration options for the client.
     * @param options.host - The hostname or IP address of the ARGOS server.
     * @param options.port - The port number of the ARGOS server.
     * @param options.cookie - Login token cookie for authentication.
     * @param options.secure - Whether to use HTTPS for the connection.
     * @param options.logger - A custom logger function. See {@link default_logger}.
     * @param options.msg_logger - A custom logger function for messages. See
     * {@link default_msg_logger}.
     */
    constructor({ host, port, cookie, secure, logger, msg_logger, }?: {
        host?: string;
        port?: string | number;
        cookie?: string;
        secure?: boolean;
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
     * If responseId is not provided, a new responseId will be generated and the
     * message part of the response will not be emitted on the ArgosClient event
     * emitter. If an emit is wanted, then set the responseId to event name.
     * @example
     *     argos.emit(API.MISSION_CENTER_GET, {}) // Will not emit response
     *     argos.emit(API.MISSION_CENTER_GET, {}, API.MISSION_CENTER) // Will emit response
     *
     * @param event - ARGOS internal or external event
     * @param message - Event data. Type inferred from 'event`
     * @param responseId - Optional responseId to use for the request. If not
     * provided, a new responseId will be generated.
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
