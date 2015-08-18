var WebToPay = require('./WebToPay.js');
var f = new WebToPay({ 'projectId' : 'XXXXX', 'signPassword' : 'YYYYYYYYYYYY' });

f.orderid = '123';
f.accepturl = 'http://test.lt';
f.cancelurl = 'http://test.lt';
f.callbackurl = 'http://test.lt';
f.p_email = 'test@test.com';
f.amount = 100;
f.currency = 'EUR';



console.log(f.createUrl(f.buildRequest()));