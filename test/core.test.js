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

  it('should correctly encode data', function() {
    // Arrange
    var data = {
      orderid: 123,
      p_email: 'test@test.com',
      p_firstname: 'John Smith',
      amount: 145,
      currency: 'EUR'
    };

    // Act
    var mergedData = paysera.mergeParams(data);
    var encodedData = paysera.encode(data);

    // Assert
    encodedData.should.not.be.exactly(mergedData);
  });

  it('should correctly decode data', function() {
    // Arrange
    var data = {
      orderid: 123,
      p_email: 'test@test.com',
      p_firstname: 'John Smith',
      amount: 145,
      currency: 'EUR'
    };

    // Act
    var encodedData = paysera.encode(data);
    var result = paysera.decode(encodedData);

    // Assert
    encodedData.should.not.be.exactly(data);
  });

  it('should correctly build url', function() {
    // Arrange
    var data = 'my-data';
    var ss1 = 'signature';

    // Act
    var result = paysera.createUrl(data, ss1);

    // Assert
    result.should.be.exactly(paysera.payUrl + '?data=' + data + '&sign=' + ss1);
  });

  it('should correctly check callback', function() {
    // Arrange
    var request = {
      data: 'encoded-data-here'
    };

    // Act
    request.ss1 = paysera.sign(request.data);
    var result = paysera.checkCallback(request);

    // Assert
    result.should.be.exactly(true);
  });
});
