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
    const data =
      'cHJvamVjdGlkPTE1NDk0MiZ0ZXN0PTEmb3JkZXJpZD0xMjMmcF9lbWFpbD1jdXN0b21lciU0MGVtYWlsLmNvbSZhbW91bnQ9MSZjdXJyZW5jeT1FVVImb3JpZ2luYWxfcGF5dGV4dD0mbGFuZz1saXQmcGF5bWVudD1zYW1wbyZwYXl0ZXh0PVUlQzUlQkVzYWt5bW8rbnIlM0ErMTIzK2h0dHAlM0ElMkYlMkZsb2NhbGhvc3QrcHJvamVrdGUuKyUyOFBhcmRhdiVDNCU5N2phcyUzQStEb21hcytQZXRrZXZpJUM0JThEaXVzJTI5JmNvdW50cnk9TFQmc3RhdHVzPTEmcmVxdWVzdGlkPTI5MTE4MDQ3NCZuYW1lPU5hbWUmc3VyZW5hbWU9TGFzdCtuYW1lJnBheWFtb3VudD0xJnBheWN1cnJlbmN5PUVVUiZhY2NvdW50PVRFU1QxMjM0NTY3ODkwJnZlcnNpb249MS42';
    const ss1 = utils.sign(data, 'YYY');
    const ss2 =
      'x81-dGngdW3cJKYnwN7hGNGl4rxAyKVnvE5joTPjgzTNSfw5CH1vQseQi3YFInWh8qgVO4JKaZ5J6I-LijAuIxD3ygwJh95GIl4xVSVJSpw3bZSkCYc-SQ_ad4zFR9Su5-RwOYrPhhsq7HR6NcmpX7UFdozZvEoDUl0uHGEDEQI=';

    const result = webToPay.validateSignature({
      data,
      ss1,
      ss2
    });
    expect(result).to.equal(true);
  });
});
