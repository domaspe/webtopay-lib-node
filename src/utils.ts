const querystring = require('querystring');
const crypto = require('crypto');

export function encode(params: object) {
  const data = querystring.stringify(params);
  const encodedUrl = Buffer.from(data).toString('base64');

  return encodedUrl;
}

export function sign(data: string, password: string): string {
  return crypto
    .createHash('md5')
    .update(data + password)
    .digest('hex');
}

export function createUrl(url: string, data: string, signature: string) {
  return `${url}?data=${data}&sign=${signature}`;
}
