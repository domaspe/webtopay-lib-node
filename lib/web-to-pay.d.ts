import { IConfig, ICallback, IParsedUrlQuery } from '../types';
export default class WebToPay {
    private defaultConfig;
    private password;
    private payUrl;
    constructor(config: IConfig);
    buildRequestUrl(params: any): string;
    validateSignature(callback: ICallback): boolean;
    decode(data: string): IParsedUrlQuery;
}
