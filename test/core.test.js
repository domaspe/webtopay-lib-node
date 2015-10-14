var should = require('should');
var Paysera = require('../');

describe('Paysera', function() {
  it('should correctly merge request with default config', function() {
    // Arrange
    var config = {
      projectid: 'XXX',
      sign_password: 'YYY',
      accepturl: 'http://myaccept.url',
      cancelurl: 'http://mycancel.url',
      callbackurl: 'http://mycallback.url',
      test: 1
    };
    var paysera = new Paysera(config);

    var orderParams = {
      orderid: 123,
      p_email: 'test@test.com',
      amount: 100,
      currency: 'EUR'
    };

    // Act
    var result = paysera.mergeParams(orderParams);

    // Assert
    result.should.have.property('projectid', config.projectid);
    result.should.have.property('sign_password', config.sign_password);
    result.should.have.property('accepturl', config.accepturl);
    result.should.have.property('cancelurl', config.cancelurl);
    result.should.have.property('callbackurl', config.callbackurl);
    result.should.have.property('test', config.test);
    result.should.have.property('orderid', orderParams.orderid);
    result.should.have.property('p_email', orderParams.p_email);
    result.should.have.property('amount', orderParams.amount);
    result.should.have.property('currency', orderParams.currency);
  });
});
