import { encode, sign, createUrl, validateSignature, decodeUriSafe, encodeUriSafe } from './utils';
import querystring from 'querystring';
import { IConfig, ICallback, IUrlQuery } from '../types';

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

    const dataBase64 = encode(requestParams);
    const data = encodeUriSafe(dataBase64);

    const signatureHex = sign(data, this.password);
    const signature = encodeUriSafe(signatureHex);

    return createUrl(this.payUrl, data, signature);
  }

  public validateSignature(callback: ICallback) {
    const data = callback.data;
    const ss1Hex = decodeUriSafe(callback.ss1);
    const ss2Base64 = decodeUriSafe(callback.ss2);
    return ss1Hex === sign(data, this.password) && validateSignature(data, ss2Base64);
  }

  public decode(data: string): IUrlQuery {
    const dataBase64 = decodeUriSafe(data);
    const decodedUrl = Buffer.from(dataBase64, 'base64').toString('ascii');
    return querystring.parse(decodedUrl);
  }
}
