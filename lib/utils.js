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
function createUrl(url, data, signature) {
    return url + "?data=" + data + "&sign=" + signature;
}
exports.createUrl = createUrl;
function checkSignature(data, signature) {
    return cert_1.default.publicKey.verify(Buffer.from(data), Buffer.from(signature), 'sha1');
}
exports.checkSignature = checkSignature;
