"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = __importDefault(require("querystring"));
var crypto_1 = __importDefault(require("crypto"));
var cert_1 = __importDefault(require("./cert"));
function encode(params) {
    var data = querystring_1.default.stringify(params);
    var encodedUrl = Buffer.from(data).toString('base64');
    return encodedUrl;
}
exports.encode = encode;
function sign(data, password) {
    return crypto_1.default
        .createHash('md5')
        .update(data + password)
        .digest('hex');
}
exports.sign = sign;
function decodeUriSafe(str) {
    return str.replace('_', '/').replace('-', '+');
}
exports.decodeUriSafe = decodeUriSafe;
function encodeUriSafe(str) {
    return str.replace('/', '_').replace('+', '-');
}
exports.encodeUriSafe = encodeUriSafe;
function createUrl(url, data, signature) {
    return url + "?data=" + data + "&sign=" + signature;
}
exports.createUrl = createUrl;
function validateSignature(data, signatureBase64) {
    return cert_1.default.publicKey.verify(Buffer.from(data, 'ascii'), Buffer.from(signatureBase64, 'base64'), 'sha1');
}
exports.validateSignature = validateSignature;
