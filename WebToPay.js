// Constructor
function WebToPay() {
   

    this.version = '1.6';
    this.payUrl = 'https://www.paysera.com/pay/';
    this.xmlUrl = 'https://www.paysera.com/pay/';


}
// class methods
WebToPay.prototype.buildRequest = function(data) {

var url64 = require("querystring");
url64.stringify(data);
console.log(url64.parse() + this.password);
//var err = new Error("Can't divide by zero")l
//console.log(err);



};



WebToPay.prototype.build64 = function(reqData) { 

	var data64 = new Buffer(reqData).toString('base64'); 
        console.log(reqData);
        console.log(data64);

}



// export the class
module.exports = WebToPay;



var f = new WebToPay();
f.password = 'psw';


var ddd = {'projectid':123456, 'amount':200};
f.buildRequest(ddd)
//f.build64()
console.log(f.version);


