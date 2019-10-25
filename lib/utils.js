"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require('querystring');
var crypto = require('crypto');
function encode(params) {
    var rawUrl = querystring.stringify(params);
    var encodedUrl = new Buffer(rawUrl).toString('base64');
    return encodedUrl;
}
exports.encode = encode;
function sign(data, password) {
    return crypto
        .createHash('md5')
        .update(data + password)
        .digest('hex');
}
exports.sign = sign;
function createUrl(url, data, signature) {
    return url + "?data=" + data + "&sign=" + signature;
}
exports.createUrl = createUrl;
