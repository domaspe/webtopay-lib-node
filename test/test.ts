import WebToPay from '../src';
import * as utils from '../src/utils';

const expect = require('chai').expect;

const webToPay = new WebToPay({
  projectid: 'XXX',
  password: 'YYY',
  accepturl: 'http://myaccept.url',
  cancelurl: 'http://mycancel.url',
  callbackurl: 'http://mycallback.url',
  test: 1
});

describe('WebToPay', () => {
  it('should correctly build url', () => {
    const correctUrl =
      'https://bank.paysera.com/pay/?data=cHJvamVjdGlkPVhYWCZhY2NlcHR1cmw9aHR0cCUzQSUyRiUyRm15YWNjZXB0LnVybCZjYW5jZWx1cmw9aHR0cCUzQSUyRiUyRm15Y2FuY2VsLnVybCZjYWxsYmFja3VybD1odHRwJTNBJTJGJTJGbXljYWxsYmFjay51cmwmdGVzdD0xJm9yZGVyaWQ9MTIzJnBfZW1haWw9dGVzdCU0MHRlc3QuY29tJnBfZmlyc3RuYW1lPUpvaG4lMjBTbWl0aCZhbW91bnQ9MTQ1JmN1cnJlbmN5PUVVUg==&sign=cce0555a8a333f5c9dca02e2e4994d50';

    const url = webToPay.buildRequestUrl({
      orderid: 123,
      p_email: 'test@test.com',
      p_firstname: 'John Smith',
      amount: 145,
      currency: 'EUR'
    });

    expect(url).to.equal(correctUrl);
  });

  it('should correctly decode data', () => {
    const data = {
      orderid: '123',
      p_email: 'test@test.com',
      p_firstname: 'John Smith',
      amount: '145',
      currency: 'EUR'
    };

    const encodedData = utils.encode(data);
    const result = webToPay.decode(encodedData);

    expect(result).to.deep.equal(data);
  });

  it('should correctly check callback', () => {
    const request = {
      data: 'encoded-data-here',
      ss1: utils.sign('encoded-data-here', 'YYY'),
      ss2: ''
    };

    const result = webToPay.validateSignature(request);
    expect(result).to.equal(true);
  });
});
