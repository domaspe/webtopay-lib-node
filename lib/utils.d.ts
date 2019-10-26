import { IUrlQuery } from '../types';
export declare function encode(params: IUrlQuery): string;
export declare function sign(data: string, password: string): string;
export declare function decodeUriSafe(str: string): string;
export declare function encodeUriSafe(str: string): string;
export declare function createUrl(url: string, data: string, signature: string): string;
export declare function validateSignature(data: string, signatureBase64: string): boolean;
