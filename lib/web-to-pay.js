var querystring = require('querystring');
var crypto = require('crypto');


function WebToPay(config) {
  this.defaultConfig = config || {};

  this.version = '1.6';
  this.payUrl = 'https://www.paysera.com/pay/';
  this.xmlUrl = 'https://www.paysera.com/new/api/paymentMethods/';
  this.key = 'http://downloads.paysera.com/download/public.key';
}

WebToPay.prototype.buildRequestUrl = function(params) {
  var requestParams = this.mergeParams(params);
  var encodedParams = this.stringifyAndEncodeWithBase64(requestParams);
  var signature = this.sign(encodedParams);

  return this.createUrl(encodedParams, signature);
};

WebToPay.prototype.checkCallback = function(request) {
  var ss1 = this.sign(request);
  return request.ss1 == ss1;
};

// For internal usage

WebToPay.prototype.mergeParams = function(params) {
  var requestParams = JSON.parse(JSON.stringify(this.defaultConfig));
  for (var key in params) {
    requestParams[key] = params[key];
  }

  return requestParams;
};

WebToPay.prototype.stringifyAndEncodeWithBase64 = function(params) {
  var rawUrl = querystring.stringify(params);
  var encodedUrl = new Buffer(rawUrl).toString('base64')
    .replace('/', '_')
    .replace('+', '-');

  return encodedUrl;
};

WebToPay.prototype.sign = function(content) {
  // TODO: Check if sign_password is set
  return crypto.createHash('md5').update(content + this.defaultConfig.sign_password).digest('hex');
};

WebToPay.prototype.createUrl = function(data, sign) {
  return this.defaultConfig.payUrl + '?data=' + data + '&sign=' + sign;
};

module.exports = WebToPay;
