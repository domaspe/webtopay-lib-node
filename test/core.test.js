var should = require('should');
var Paysera = require('../');

var config, paysera;

describe('Paysera', function() {
  before(function () {
    config = {
      projectid: 'XXX',
      sign_password: 'YYY',
      accepturl: 'http://myaccept.url',
      cancelurl: 'http://mycancel.url',
      callbackurl: 'http://mycallback.url',
      test: 1
    };
    paysera = new Paysera(config);
  });

  it('should correctly merge request with default config', function() {
    // Arrange
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


  it('should correctly stringify and encode params', function() {
    // Arrange
    var orderParams = {
      orderid: 123,
      p_email: 'test@test.com',
      p_firstname: 'John Smith',
      amount: 145,
      currency: 'EUR'
    };

    // Act
    var result = paysera.stringifyAndEncodeWithBase64(orderParams);

    // Assert
    result.should.be.exactly('b3JkZXJpZD0xMjMmcF9lbWFpbD10ZXN0JTQwdGVzdC5jb20mcF9maXJzdG5hbWU9Sm9obiUyMFNtaXRoJmFtb3VudD0xNDUmY3VycmVuY3k9RVVS');
  });
});
