# paysera-nodejs
[Paysera](http://www.paysera.com) payment gateway plugin for node.js

[![Build Status](https://travis-ci.org/dzonatan/paysera-nodejs.svg?branch=master)](https://travis-ci.org/dzonatan/paysera-nodejs) [![Dependency Status](https://gemnasium.com/dzonatan/paysera-nodejs.svg)](https://gemnasium.com/dzonatan/paysera-nodejs) [![Coverage Status](https://coveralls.io/repos/dzonatan/paysera-nodejs/badge.svg?branch=master&service=github)](https://coveralls.io/github/dzonatan/paysera-nodejs?branch=master) [![npm version](https://badge.fury.io/js/paysera-nodejs.svg)](https://badge.fury.io/js/paysera-nodejs)

## Usage

Install this package as a npm dependency:
```
npm install paysera-nodejs --save
```

### Redirecting to paysera gateway

First, require this package in your script:
```javascript
var Paysera = require('paysera-nodejs');
```

Then, Initialize **Paysera** module with [default parameters](https://developers.paysera.com/en/payments/current#request-parameters):
```javascript
var options = {
  projectid: 'X',
  sign_password: 'Y',
  accepturl: 'http://myaccept.url',
  cancelurl: 'http://mycancel.url',
  callbackurl: 'http://mycallback.url',
  test: 0,
  ...
};
var paysera = new Paysera(options);
```

Finally, build and redirect to url with these [available parameters](https://developers.paysera.com/en/payments/current#request-parameters):
```javascript
var params = {
  orderid: 123,
  p_email: 'customer@email.com',
  amount: 100,
  currency: 'EUR',
  ...
};
var urlToGo = paysera.buildRequestUrl(params);

// Redirect to urlToGo...
```

### Accepting callback from paysera

Check if callback from paysera is valid:
```javascript
var request = { data: ..., ss1: ... }; // the request data you got from paysera callback

var isValid = paysera.checkCallback(request);
if (isValid) {
  // Since callback seems valid decode callback data
  var order = paysera.decode(request);
  // Your code ... to update order status
  
  // Don't forget to return "OK" as the response.
}
```
*All available parameters from callback are specified in [paysera specification](https://developers.paysera.com/en/payments/current#request-parameters)*

## Contacts
If any problems occur please feel free to contact support@paysera.com
