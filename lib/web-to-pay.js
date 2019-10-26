"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var querystring_1 = __importDefault(require("querystring"));
var WebToPay = /** @class */ (function () {
    function WebToPay(config) {
        var password = config.password, defaultConfig = __rest(config, ["password"]);
        this.defaultConfig = defaultConfig;
        this.password = password;
        this.payUrl = 'https://bank.paysera.com/pay/';
    }
    WebToPay.prototype.buildRequestUrl = function (params) {
        var requestParams = __assign(__assign({}, this.defaultConfig), params);
        var dataBase64 = utils_1.encode(requestParams);
        var data = utils_1.encodeUriSafe(dataBase64);
        var signatureHex = utils_1.sign(data, this.password);
        var signature = utils_1.encodeUriSafe(signatureHex);
        return utils_1.createUrl(this.payUrl, data, signature);
    };
    WebToPay.prototype.validateSignature = function (callback) {
        var data = callback.data;
        var ss1Hex = utils_1.decodeUriSafe(callback.ss1);
        var ss2Base64 = utils_1.decodeUriSafe(callback.ss2);
        return ss1Hex === utils_1.sign(data, this.password) && utils_1.validateSignature(data, ss2Base64);
    };
    WebToPay.prototype.decode = function (data) {
        var dataBase64 = utils_1.decodeUriSafe(data);
        var decodedUrl = Buffer.from(dataBase64, 'base64').toString('ascii');
        return querystring_1.default.parse(decodedUrl);
    };
    return WebToPay;
}());
exports.default = WebToPay;
