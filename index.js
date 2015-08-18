var WebToPay = require('./WebToPay.js');
var f = new WebToPay({ 'projectId' : '40712', 'signPassword' : '3f722c39358fed674747c4197d6d6687' });

f.orderid = '123';
f.accepturl = 'http://test.lt';
f.cancelurl = 'http://test.lt';
f.callbackurl = 'http://test.lt';
f.p_email = 't2@evp.lt';
f.amount = 100;
f.currency = 'EUR';



console.log(f.createUrl(f.buildRequest()));