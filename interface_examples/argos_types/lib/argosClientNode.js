/**
 * Copyright (c) 2026 MyDefence A/S. All rights reserved.
 *
 * These computer program listings and specifications are the property of
 * MyDefence A/S and shall not be reproduced or copied or used in whole or in
 * part without written permission from MyDefence A/S.
 */
import axios from 'axios';
import { Agent } from 'https';
import { MYDEFENCE_ROOT_CA } from './argosClientWeb.js';
export * from './argosClientWeb.js';
/** Login on login REST endpoint and return login token from cookie. Cookie is
 * normally stored in a browser cookie. */
export async function apiLogin({ host = 'c2-server.local', port = '4000', username, password, ca = MYDEFENCE_ROOT_CA, }) {
    const response = await axios
        .post(`https://${host}:${port}/login`, { username, password }, { httpsAgent: new Agent({ ca }) })
        .catch((err) => {
        // response?.data is set on e.g. login failure (response from server), but not on
        // network errors (ECONNREFUSED)
        throw new Error(`Login failed: ${err.response?.data ?? err}`);
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
//# sourceMappingURL=argosClientNode.js.map