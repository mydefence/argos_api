"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgosClient = void 0;
exports.apiLogin = apiLogin;
/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
const socket_io_client_1 = require("socket.io-client");
const events_1 = require("events");
const util_1 = __importDefault(require("util"));
const axios_1 = __importDefault(require("axios"));
const https_1 = require("https");
/** The default logger used. Implements same interface as `util.format()`.
 * Should be easy to map to e.g. a winston logger. */
function default_logger(format, ...param) {
    console.log(new Date().toISOString(), util_1.default.format(format, ...param));
}
/** The default logger for messages sent and received. Direction for
 * request/response pattern will show '←R', 'R→', and push messages from ARGOS
 * API will show 'P→' */
function default_msg_logger(event, message, direction) {
    default_logger('%s %s %O', event, direction, message);
}
/** Login on login REST endpoint and return login token from cookie. Cookie is
 * normally stored in a browser cookie. */
async function apiLogin({ host = 'c2-server.local', port = '4000', username, password, }) {
    const response = await axios_1.default
        .post(`https://${host}:${port}/login`, { username, password }, { httpsAgent: new https_1.Agent({ ca: MYDEFENCE_ROOT_CA }) })
        .catch((err) => {
        throw new Error(`Login failed: ${err.response?.data}`);
    });
    const cookies = response.headers['set-cookie'];
    if (!cookies)
        throw new Error('No cookies in login response');
    const loginCookie = cookies.find((cookie) => cookie.startsWith('login_token='));
    if (!loginCookie)
        throw new Error('No login token in login response');
    // Extract the JWT token from the login cookie
    return loginCookie;
}
/** Class wraps socket.io connection to ARGOS server, and exposes the ARGOS API
 * with correct typing.
 * */
class ArgosClient extends events_1.EventEmitter {
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
    constructor({ host = 'c2-server.local', port = 5051, cookie = undefined, secure = true, logger = default_logger, msg_logger = default_msg_logger, } = {}) {
        super();
        this.responseCnt = 0;
        this.logger = logger;
        this.msg_logger = msg_logger;
        let endpoint;
        let ca;
        if (secure) {
            endpoint = `https://${host}:${port}/`;
            ca = MYDEFENCE_ROOT_CA;
        }
        else {
            endpoint = `http://${host}:${port}/`;
        }
        this.logger('CONNECTING to %s', endpoint);
        this.sc = (0, socket_io_client_1.io)(endpoint, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5000,
            secure,
            ca,
            ...(cookie && { extraHeaders: { Cookie: cookie } }),
        });
        this.connectedPromise = new Promise((resolve, reject) => {
            this.sc.once('connect', resolve);
            this.sc.once('connect_error', (reason) => {
                this.logger('CONNECT ERROR %s', reason);
                if (`${reason}`.includes('Unauthorized')) {
                    this.sc.disconnect();
                    reject(new Error(`${reason}`));
                }
            });
        });
        this.sc.onAny((event, res) => {
            if ('message' in res) {
                if (event === res.event) {
                    // This is a push message from ARGOS, not a response to a
                    // request, so we emit it
                    this.msg_logger(res.event, res.message, 'P→');
                    super.emit(res.event, res.message);
                }
                else {
                    // This is a response to a request, so we emit it with the
                    // responseId
                    this.msg_logger(res.event, res.message, 'R→');
                }
            }
        });
        this.sc.on('connect', () => {
            this.logger('CONNECTED to %s', endpoint);
        });
        this.sc.on('disconnect', (reason) => {
            this.logger('DISCONNECTED %s', reason);
            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, manual reconnect needed
                this.sc.connect();
            }
        });
    }
    /** Disconnect from ARGOS. Use only when closing service, connection cannot
     * be re-established.
     * */
    async close() {
        this.sc.disconnect();
        if (this.sc.connected) {
            await new Promise((resolve) => this.sc.once('disconnect', () => resolve()));
        }
        this.sc.removeAllListeners();
    }
    responseId() {
        this.responseCnt += 1;
        return 'req.' + this.responseCnt;
    }
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
    emit(event, message, responseId = this.responseId()) {
        this.msg_logger(event, message, '←R');
        const req = { message, responseId };
        this.sc.emit(event, req);
        return super.emit(event, message);
    }
    /** Listen for messages from ARGOS or emitted locally on in {@link emit}.
     *
     * @param event - ARGOS internal or external event
     * @param message - Event data. Type inferred from 'event`
     * */
    on(event, callback) {
        // We need to register the callback on our self, otherwise
        // removeLister() wont have any effect.
        return super.on(event, callback);
    }
    /** Send a request and return a promise for the response with an optional
     * timeout. Will reject in case of timeout.
     *
     * @example
     * ```
     * const missionCenter = await argos.request(API.MISSION_CENTER_GET, {}, API.MISSION_CENTER)
     * ```
     * */
    request(reqEvent, reqData, resEvent, timeout) {
        return new Promise((resolve, reject) => {
            const responseId = this.responseId();
            let timer;
            const listener = (msg) => {
                clearTimeout(timer);
                this.sc.removeListener(responseId, listener);
                switch (msg.event) {
                    case resEvent:
                        resolve(msg.message);
                        return;
                    case 'timeout':
                        // This is a timeout from ARGOS
                        reject(new Error(`Argos timeout of ${reqEvent} request`));
                        return;
                    case 'apiError':
                        reject(new Error(`Argos responded with apiError for ${reqEvent} request: ${JSON.stringify(msg.message)}`));
                        return;
                    default:
                        reject(new Error(`Unexpected reply ${msg.event} in response to ${reqEvent}: ${JSON.stringify(msg.message)}`));
                        return;
                }
            };
            this.sc.on(responseId, listener);
            if (timeout) {
                timer = setTimeout(() => {
                    this.sc.removeListener(responseId, listener);
                    reject(new Error(`Local timeout of ${reqEvent} request`));
                }, timeout);
            }
            this.emit(reqEvent, reqData, responseId);
        });
    }
}
exports.ArgosClient = ArgosClient;
/** Root CA certificate. Required for self-signed certificates used for HTTPS. For Chrome this is
 * installed using add_linux.zip/add_windows.zip scripts downloaded from the landing page. This
 * certificate is also present in these zip files in the file `mydefenceRootCA.pem`. In node we need
 * to supply them manually. */
const MYDEFENCE_ROOT_CA = `-----BEGIN CERTIFICATE-----
MIIC0zCCAlqgAwIBAgIUEnSNVp6b/nWzf49+D/pGFcK3IdkwCgYIKoZIzj0EAwIw
gaAxCzAJBgNVBAYTAkRLMRAwDgYDVQQIDAdKdXRsYW5kMRMwEQYDVQQHDApOci4g
U3VuZGJ5MRYwFAYDVQQKDA1NeURlZmVuY2UgQS9TMRYwFAYDVQQLDA1JVCBEZXBh
cnRtZW50MSMwIQYJKoZIhvcNAQkBFhRzdXBwb3J0QG15ZGVmZW5jZS5kazEVMBMG
A1UEAwwMbXlkZWZlbmNlLmRrMB4XDTI1MDQxNjEzMzIzN1oXDTQ1MDQxMTEzMzIz
N1owgaAxCzAJBgNVBAYTAkRLMRAwDgYDVQQIDAdKdXRsYW5kMRMwEQYDVQQHDApO
ci4gU3VuZGJ5MRYwFAYDVQQKDA1NeURlZmVuY2UgQS9TMRYwFAYDVQQLDA1JVCBE
ZXBhcnRtZW50MSMwIQYJKoZIhvcNAQkBFhRzdXBwb3J0QG15ZGVmZW5jZS5kazEV
MBMGA1UEAwwMbXlkZWZlbmNlLmRrMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE3r6a
x5Hqmo1f9C1dcAi07YnHw+UT0yFMdbNMGUPbCo4pXRdTqj9shd1CHUeFFT4Gzdsc
3VIVESvDEVvtyX/ypMKIiHR184N1d4kjRSl/TTcHBik6wPSIeOZ14yE72Nreo1Mw
UTAdBgNVHQ4EFgQU+IyChrtYu/8ZpiYbaNsy6Bbflt4wHwYDVR0jBBgwFoAU+IyC
hrtYu/8ZpiYbaNsy6Bbflt4wDwYDVR0TAQH/BAUwAwEB/zAKBggqhkjOPQQDAgNn
ADBkAjBFUUBDhg/kCZYEn9oovWqEoCuRSw0Coy202ge0qCuMUTB2CezXJxNf3To2
CMFhbpQCMDhYrhqXyRZVeS6fEF55vKSngc5pKszspei1IDcw6Q+UG+eH367qp7Np
k3N7Kjrz4A==
-----END CERTIFICATE-----`;
//# sourceMappingURL=argosClient.js.map