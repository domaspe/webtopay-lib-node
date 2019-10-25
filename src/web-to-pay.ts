import { encode, sign, createUrl, checkSignature } from './utils';
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

  public validateSignature(callback: ICallback) {
    return callback.ss1 === sign(callback.data, this.password); //  && checkSignature(callback.data, callback.ss2);
  }

  public decode(data: string) {
    const prettyfiedEncodedData = data.replace('_', '/').replace('-', '+');
    const decodedUrl = Buffer.from(prettyfiedEncodedData, 'base64').toString('ascii');
    return querystring.parse(decodedUrl);
  }
}
