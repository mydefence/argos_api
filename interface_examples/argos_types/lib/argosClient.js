"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgosClient = void 0;
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
/** The default logger used. Implements same interface as `util.format()`.
 * Should be easy to map to e.g. a winston logger. */
function default_logger(format, ...param) {
    console.log(new Date().toISOString(), util_1.default.format(format, ...param));
}
/** The default logger for messages sent and received. */
function default_msg_logger(event, message, direction) {
    default_logger('%s %s %O', event, direction, message);
}
/** Class wraps socket.io connection to ARGOS server, and exposes the ARGOS API
 * with correct typing.
 * */
class ArgosClient extends events_1.EventEmitter {
    constructor(ip = 'localhost', port = '5050', { https = false, logger = default_logger, msg_logger = default_msg_logger, } = {}) {
        super();
        this.ip = ip;
        this.port = port;
        this.responseCnt = 0;
        this.logger = logger;
        this.msg_logger = msg_logger;
        let endpoint;
        if (https) {
            endpoint = `https://${this.ip}:${this.port}/`;
        }
        else {
            endpoint = `http://${this.ip}:${this.port}/`;
        }
        this.logger('CONNECTING to %s', endpoint);
        this.sc = (0, socket_io_client_1.io)(endpoint, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5000,
            secure: https,
            rejectUnauthorized: false,
        });
        this.connectedPromise = (0, events_1.once)(this.sc, 'connect').then();
        this.sc.onAny((event, res) => {
            if ('message' in res) {
                this.msg_logger(res.event, res.message, '→');
                super.emit(res.event, res.message);
            }
        });
        this.sc.on('error', (err) => {
            this.logger('CONNECTION ERROR %O', err);
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
        this.sc.on('connect_error', (reason) => {
            this.logger('CONNECT ERROR %s', reason);
        });
    }
    /** Disconnect from ARGOS. Use only when closing service, connection cannot
     * be re-established.
     * */
    async close() {
        this.sc.disconnect();
        if (this.sc.connected) {
            await (0, events_1.once)(this.sc, 'disconnect');
        }
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
     * @param event - ARGOS internal or external event
     * @param message - Event data. Type inferred from 'event`
     * */
    emit(event, message, responseId = this.responseId()) {
        this.msg_logger(event, message, '←');
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
//# sourceMappingURL=argosClient.js.map