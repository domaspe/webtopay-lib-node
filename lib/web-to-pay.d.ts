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
}
export default class WebToPay {
    private defaultConfig;
    private password;
    private payUrl;
    constructor(config: IConfig);
    buildRequestUrl(params: any): string;
    checkCallback(callback: ICallback): boolean;
    decode(encodedData: string): any;
}
export {};
