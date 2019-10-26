import { Config, Callback, WebToPayRequest, WebToPayNotification } from '../types';
export default class WebToPay {
    private defaultConfig;
    private password;
    private payUrl;
    constructor(config: Config);
    buildRequestUrl(params: WebToPayRequest): string;
    validateSignature(callback: Callback): boolean;
    decode(data: string): WebToPayNotification;
}
