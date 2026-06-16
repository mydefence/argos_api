/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
import { Socket } from 'socket.io-client';
import { EventEmitter } from 'events';
import { ArgosTypesMap } from './argosApi.js';
/** The default logger used. Implements same interface as `util.format()`.
 * Should be easy to map to e.g. a winston logger. */
declare function default_logger(msg?: unknown, ...param: unknown[]): void;
/** The default logger for messages sent and received. Direction for
 * request/response pattern will show '←R', 'R→', and push messages from ARGOS
 * API will show 'P→' */
declare function default_msg_logger<E extends keyof ArgosTypesMap>(event: E, message: ArgosTypesMap[E], direction: '←R' | 'R→' | 'P→'): void;
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
     * @param options.auth_token - Authentication token for the ARGOS server. Alternative to cookie
     * based authentication for desktop applications. If both cookie and auth_token are provided,
     * cookie will be used.
     * @param options.secure - Whether to use HTTPS for the connection.
     * @param options.ca - TLS root CA certificate (PEM string). Used in Node.js
     * only; silently ignored when running in a browser.
     * @param options.logger - A custom logger function. See {@link default_logger}.
     * @param options.msg_logger - A custom logger function for messages. See
     * {@link default_msg_logger}.
     */
    constructor({ host, port, cookie, auth_token, secure, ca, logger, msg_logger, }?: {
        host?: string;
        port?: string | number;
        cookie?: string;
        auth_token?: string;
        secure?: boolean;
        ca?: string;
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
/** Root CA certificate. Required for self-signed certificates used for HTTPS. For Chrome this is
 * installed using add_linux.zip/add_windows.zip scripts downloaded from the landing page. This
 * certificate is also present in these zip files in the file `mydefenceRootCA.pem`. In node we need
 * to supply them manually. */
export declare const MYDEFENCE_ROOT_CA = "-----BEGIN CERTIFICATE-----\nMIIC0zCCAlqgAwIBAgIUEnSNVp6b/nWzf49+D/pGFcK3IdkwCgYIKoZIzj0EAwIw\ngaAxCzAJBgNVBAYTAkRLMRAwDgYDVQQIDAdKdXRsYW5kMRMwEQYDVQQHDApOci4g\nU3VuZGJ5MRYwFAYDVQQKDA1NeURlZmVuY2UgQS9TMRYwFAYDVQQLDA1JVCBEZXBh\ncnRtZW50MSMwIQYJKoZIhvcNAQkBFhRzdXBwb3J0QG15ZGVmZW5jZS5kazEVMBMG\nA1UEAwwMbXlkZWZlbmNlLmRrMB4XDTI1MDQxNjEzMzIzN1oXDTQ1MDQxMTEzMzIz\nN1owgaAxCzAJBgNVBAYTAkRLMRAwDgYDVQQIDAdKdXRsYW5kMRMwEQYDVQQHDApO\nci4gU3VuZGJ5MRYwFAYDVQQKDA1NeURlZmVuY2UgQS9TMRYwFAYDVQQLDA1JVCBE\nZXBhcnRtZW50MSMwIQYJKoZIhvcNAQkBFhRzdXBwb3J0QG15ZGVmZW5jZS5kazEV\nMBMGA1UEAwwMbXlkZWZlbmNlLmRrMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE3r6a\nx5Hqmo1f9C1dcAi07YnHw+UT0yFMdbNMGUPbCo4pXRdTqj9shd1CHUeFFT4Gzdsc\n3VIVESvDEVvtyX/ypMKIiHR184N1d4kjRSl/TTcHBik6wPSIeOZ14yE72Nreo1Mw\nUTAdBgNVHQ4EFgQU+IyChrtYu/8ZpiYbaNsy6Bbflt4wHwYDVR0jBBgwFoAU+IyC\nhrtYu/8ZpiYbaNsy6Bbflt4wDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAgNn\nADBkAjBFUUBDhg/kCZYEn9oovWqEoCuRSw0Coy202ge0qCuMUTB2CezXJxNf3To2\nCMFhbpQCMDhYrhqXyRZVeS6fEF55vKSngc5pKszspei1IDcw6Q+UG+eH367qp7Np\nk3N7Kjrz4A==\n-----END CERTIFICATE-----";
export {};
