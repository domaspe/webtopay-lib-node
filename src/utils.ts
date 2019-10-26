import querystring from 'querystring';
import crypto from 'crypto';
import cert from './cert';
import { UrlQuery } from '../types';

export function encode(params: UrlQuery) {
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

export function decodeUriSafe(str: string) {
  return str.replace('_', '/').replace('-', '+');
}

export function encodeUriSafe(str: string) {
  return str.replace('/', '_').replace('+', '-');
}

export function createUrl(url: string, data: string, signature: string) {
  return `${url}?data=${data}&sign=${signature}`;
}

export function validateSignature(data: string, signatureBase64: string) {
  return cert.publicKey.verify(Buffer.from(data, 'ascii'), Buffer.from(signatureBase64, 'base64'), 'sha1');
}
