import { encode, sign, createUrl } from './utils';
const querystring = require('querystring');

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
  private defaultConfig: any;
  private password: string;
  private payUrl: string;

  constructor(config: IConfig) {
    const { password, ...defaultConfig } = config;
    this.defaultConfig = defaultConfig;
    this.password = password;

    this.payUrl = 'https://bank.paysera.com/pay/';
  }

  public buildRequestUrl(params: any) {
    const requestParams = { ...this.defaultConfig, ...params };
    const encodedParams = encode(requestParams);
    const signature = sign(encodedParams, this.password);

    return createUrl(this.payUrl, encodedParams, signature);
  }

  public checkCallback(callback: ICallback) {
    const ss1 = sign(callback.data, this.password);
    return callback.ss1 === ss1;
  }

  public decode(encodedData: string): object {
    const prettyfiedEncodedData = encodedData.replace('_', '/').replace('-', '+');
    const decodedUrl = Buffer.from(prettyfiedEncodedData, 'base64').toString('ascii');
    const params = querystring.parse(decodedUrl);

    return params;
  }
}
