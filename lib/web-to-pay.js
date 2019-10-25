import querystring from 'querystring';
import crypto from 'crypto';

function encode(params) {
  const rawUrl = querystring.stringify(params);
  const encodedUrl = new Buffer(rawUrl).toString('base64');

  return encodedUrl;
}

function decode(encodedData) {
  const prettyfiedEncodedData = encodedData.replace('_', '/').replace('-', '+');
  const decodedUrl = new Buffer(prettyfiedEncodedData, 'base64').toString(
    'ascii'
  );
  const params = querystring.parse(decodedUrl);

  return params;
}

function sign(data, password) {
  return crypto
    .createHash('md5')
    .update(data + password)
    .digest('hex');
}

function createUrl(url, data, sign) {
  return `${url}?data=${data}&sign=${sign}`;
}

export default class WebToPay {
  constructor(config) {
    this.defaultConfig = config || {};

    this.version = '1.6';
    this.payUrl = 'https://bank.paysera.com/pay/';
    this.key = 'https://bank.paysera.com/download/public.key';
  }

  buildRequestUrl() {
    const requestParams = { ...this.defaultConfig, ...params };
    const encodedParams = encode(requestParams);
    const signature = sign(encodedParams, this.defaultConfig.signPassword);

    return createUrl(this.payUrl, encodedParams, signature);
  }

  checkCallback(request) {
    const ss1 = sign(request.data, this.defaultConfig.signPassword);
    return request.ss1 == ss1;
  }
}
