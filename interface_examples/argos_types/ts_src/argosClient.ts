/*******************************************************************************
 *
 * Copyright (C) 2020 MyDefence Communication A/S. All rights reserved.
 *
 * These computer program listings and specifications, are the property of
 * MyDefence Communication A/S and shall not be reproduced or copied or used in
 * whole or in part without written permission from MyDefence Communication A/S.
 *
 *******************************************************************************/
import { io, Socket } from 'socket.io-client'
import { EventEmitter } from 'events'
import { ArgosReq, ArgosRes, ArgosTypesMap } from './argosApi'
import util from 'util'
import axios from 'axios'
import { Agent } from 'https'

/** The default logger used. Implements same interface as `util.format()`.
 * Should be easy to map to e.g. a winston logger. */
function default_logger(format?: unknown, ...param: unknown[]) {
    console.log(new Date().toISOString(), util.format(format, ...param))
}

/** The default logger for messages sent and received. Direction for
 * request/response pattern will show '←R', 'R→', and push messages from ARGOS
 * API will show 'P→' */
function default_msg_logger<E extends keyof ArgosTypesMap>(
    event: E,
    message: ArgosTypesMap[E],
    direction: '←R' | 'R→' | 'P→',
) {
    default_logger('%s %s %O', event, direction, message)
}

/** Login on login REST endpoint and return login token from cookie. Cookie is
 * normally stored in a browser cookie. */
export async function apiLogin({
    host = 'c2-server.local',
    port = '4000',
    username,
    password,
    ca = MYDEFENCE_ROOT_CA,
}: {
    host?: string
    port?: string
    username: string
    password: string
    ca?: string
}) {
    const response = await axios
        .post(`https://${host}:${port}/login`, { username, password }, { httpsAgent: new Agent({ ca }) })
        .catch((err) => {
            throw new Error(`Login failed: ${err.response?.data}`)
        })

    const cookies = response.headers['set-cookie']
    if (!cookies) throw new Error('No cookies in login response')
    const loginCookie = cookies.find((cookie: string) => cookie.startsWith('login_token='))
    if (!loginCookie) throw new Error('No login token in login response')

    // Extract the JWT token from the login cookie
    return loginCookie
}

/** Class wraps socket.io connection to ARGOS server, and exposes the ARGOS API
 * with correct typing.
 * */
export class ArgosClient extends EventEmitter {
    /** Wait for this before sending requests. Authentication errors are not
     * expected to go away, so causes reject. Other errors causes retry and
     * promise stays pending. */
    public connectedPromise: Promise<void>
    /** The socket.io connection to ARGOS. Normally not needed. */
    public sc: Socket

    private responseCnt = 0
    private logger: typeof default_logger
    private msg_logger: typeof default_msg_logger

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
    public constructor({
        host = 'c2-server.local',
        port = undefined,
        cookie = undefined,
        secure = true,
        ca = MYDEFENCE_ROOT_CA,
        logger = default_logger,
        msg_logger = default_msg_logger,
    }: {
        host?: string
        port?: string | number
        cookie?: string
        secure?: boolean
        ca?: string
        logger?: typeof default_logger
        msg_logger?: typeof default_msg_logger
    } = {}) {
        super()
        this.logger = logger
        this.msg_logger = msg_logger
        let endpoint: string
        if (secure) {
            port ??= 5051
            endpoint = `https://${host}:${port}/`
        } else {
            port ??= 5050
            endpoint = `http://${host}:${port}/`
        }
        this.logger('CONNECTING to %s', endpoint)

        this.sc = io(endpoint, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5000,
            secure,
            ca,
            ...(cookie && { extraHeaders: { Cookie: cookie } }),
        })

        this.connectedPromise = new Promise<void>((resolve, reject) => {
            this.sc.once('connect', resolve)
            this.sc.once('connect_error', (reason) => {
                this.logger('CONNECT ERROR %s', reason)
                if (`${reason}`.includes('Unauthorized')) {
                    this.sc.disconnect()
                    reject(new Error(`${reason}`))
                }
            })
        })

        this.sc.onAny((event, res: ArgosRes) => {
            if ('message' in res) {
                if (event === res.event) {
                    // This is a push message from ARGOS, not a response to a
                    // request, so we emit it
                    this.msg_logger(res.event, res.message, 'P→')
                    super.emit(res.event, res.message)
                } else {
                    // This is a response to a request, so we emit it with the
                    // responseId
                    this.msg_logger(res.event, res.message, 'R→')
                }
            }
        })

        this.sc.on('connect', () => {
            this.logger('CONNECTED to %s', endpoint)
        })

        this.sc.on('disconnect', (reason) => {
            this.logger('DISCONNECTED %s', reason)
            if (reason === 'io server disconnect') {
                // the disconnection was initiated by the server, manual reconnect needed
                this.sc.connect()
            }
        })
    }

    /** Disconnect from ARGOS. Use only when closing service, connection cannot
     * be re-established.
     * */
    public async close() {
        this.sc.disconnect()
        if (this.sc.connected) {
            await new Promise<void>((resolve) => this.sc.once('disconnect', () => resolve()))
        }
        this.sc.removeAllListeners()
    }

    private responseId(): string {
        this.responseCnt += 1
        return 'req.' + this.responseCnt
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
    public emit<E extends keyof ArgosTypesMap>(
        event: E,
        message: ArgosTypesMap[E],
        responseId: string = this.responseId(),
    ): boolean {
        this.msg_logger(event, message, '←R')
        const req: ArgosReq = { message, responseId }
        this.sc.emit(event, req)
        return super.emit(event, message)
    }

    /** Listen for messages from ARGOS or emitted locally on in {@link emit}.
     *
     * @param event - ARGOS internal or external event
     * @param message - Event data. Type inferred from 'event`
     * */
    public on<E extends keyof ArgosTypesMap>(event: E, callback: (message: ArgosTypesMap[E]) => void): this {
        // We need to register the callback on our self, otherwise
        // removeLister() wont have any effect.
        return super.on(event, callback)
    }

    /** Send a request and return a promise for the response with an optional
     * timeout. Will reject in case of timeout.
     *
     * @example
     * ```
     * const missionCenter = await argos.request(API.MISSION_CENTER_GET, {}, API.MISSION_CENTER)
     * ```
     * */
    public request<T extends keyof ArgosTypesMap, U extends keyof ArgosTypesMap>(
        reqEvent: T,
        reqData: ArgosTypesMap[T],
        resEvent: U,
        timeout?: number,
    ): Promise<ArgosTypesMap[U]> {
        return new Promise<ArgosTypesMap[U]>((resolve, reject) => {
            const responseId = this.responseId()

            let timer: NodeJS.Timeout | undefined
            const listener = (msg: ArgosRes) => {
                clearTimeout(timer)
                this.sc.removeListener(responseId, listener)

                switch (msg.event) {
                    case resEvent:
                        resolve(msg.message as unknown as ArgosTypesMap[U])
                        return
                    case 'timeout':
                        // This is a timeout from ARGOS
                        reject(new Error(`Argos timeout of ${reqEvent} request`))
                        return
                    case 'apiError':
                        reject(
                            new Error(
                                `Argos responded with apiError for ${reqEvent} request: ${JSON.stringify(msg.message)}`,
                            ),
                        )
                        return
                    default:
                        reject(
                            new Error(
                                `Unexpected reply ${msg.event} in response to ${reqEvent}: ${JSON.stringify(
                                    msg.message,
                                )}`,
                            ),
                        )
                        return
                }
            }

            this.sc.on(responseId, listener)
            if (timeout) {
                timer = setTimeout(() => {
                    this.sc.removeListener(responseId, listener)
                    reject(new Error(`Local timeout of ${reqEvent} request`))
                }, timeout)
            }
            this.emit(reqEvent, reqData, responseId)
        })
    }
}

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
-----END CERTIFICATE-----`
