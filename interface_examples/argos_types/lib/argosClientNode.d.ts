export * from './argosClientWeb.js';
/** Login on login REST endpoint and return login token from cookie. Cookie is
 * normally stored in a browser cookie. */
export declare function apiLogin({ host, port, username, password, ca, }: {
    host?: string;
    port?: string;
    username: string;
    password: string;
    ca?: string;
}): Promise<string>;
