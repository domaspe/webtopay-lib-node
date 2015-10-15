# paysera-nodejs
[Paysera](http://www.paysera.com) payment gateway plugin for node.js

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
var request; // the request data you got from callback, it should have three params (data, ss1 and ss2)

var isValid = paysera.checkCallback(request);
if (isValid) {
  // Callback seems valid.

  // Update the order depending on callback parameters like orderid, status,
  // Don't forget to return "OK" as the response.
}
```
*All available parameters from callback are specified in [paysera specification](https://developers.paysera.com/en/payments/current#request-parameters)*

## Contacts
If any problems occur please feel free to contact support@paysera.com
