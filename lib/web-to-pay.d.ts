/// <reference types="node" />
import querystring from 'querystring';
interface IConfig {
    projectid: string;
    password: string;
    accepturl: string;
    cancelurl: string;
    callbackurl: string;
    test?: number;
}
interface ICallback {
    data: string;
    ss1: string;
    ss2: string;
}
export default class WebToPay {
    private defaultConfig;
    private password;
    private payUrl;
    constructor(config: IConfig);
    buildRequestUrl(params: any): string;
    validateSignature(callback: ICallback): boolean;
    decode(data: string): querystring.ParsedUrlQuery;
}
export {};
