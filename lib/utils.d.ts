/// <reference types="node" />
import { ParsedUrlQueryInput } from 'querystring';
export declare function encode(params: ParsedUrlQueryInput): string;
export declare function sign(data: string, password: string): string;
export declare function createUrl(url: string, data: string, signature: string): string;
export declare function checkSignature(data: string, signature: string): boolean;
