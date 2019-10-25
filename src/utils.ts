import querystring, { ParsedUrlQueryInput } from 'querystring';
import crypto from 'crypto';
import cert from './cert';

export function encode(params: ParsedUrlQueryInput) {
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

export function checkSignature(data: string, signature: string) {
  return cert.publicKey.verify(Buffer.from(data), Buffer.from(signature), 'sha1');
}
