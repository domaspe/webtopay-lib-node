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
        var encodedParams = utils_1.encode(requestParams);
        var signature = utils_1.sign(encodedParams, this.password);
        return utils_1.createUrl(this.payUrl, encodedParams, signature);
    };
    WebToPay.prototype.validateSignature = function (callback) {
        return callback.ss1 === utils_1.sign(callback.data, this.password); //  && checkSignature(callback.data, callback.ss2);
    };
    WebToPay.prototype.decode = function (data) {
        var prettyfiedEncodedData = data.replace('_', '/').replace('-', '+');
        var decodedUrl = Buffer.from(prettyfiedEncodedData, 'base64').toString('ascii');
        return querystring_1.default.parse(decodedUrl);
    };
    return WebToPay;
}());
exports.default = WebToPay;
