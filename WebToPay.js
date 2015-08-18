// Constructor
function WebToPay(cred) {
   

    this.projectid = cred.projectId;
    this.sign_password = cred.signPassword;
    this.orderid = '';
    this.accepturl = '';
    this.cancelurl = '';
    this.callbackurl = '';
    this.version = '1.6';
    this.test = '1';
    this.payUrl = 'https://www.paysera.com/pay/';
    this.xmlUrl = 'https://www.paysera.com/new/api/paymentMethods/';


}
// class methods
WebToPay.prototype.buildRequest = function() {

	var url64 = require("querystring");
	var crypto = require('crypto');

	var obj = JSON.parse(JSON.stringify(this));
	delete obj.sign_password;
	delete obj.payUrl;
	delete obj.xmlUrl;

	var a64   = url64.stringify(obj);

	var data64 = new Buffer(a64).toString('base64');
	data64 = data64.replace('/', '_');
	data = data64.replace('+', '-');

	var sign = crypto.createHash('md5').update(data + this.sign_password).digest('hex');
	

        return {'data':data, 'sign':sign};

};



WebToPay.prototype.createUrl = function(req) { 


        return this.payUrl + '?data='+req.data+'&sign='+req.sign;

}



// export the class
module.exports = WebToPay;


