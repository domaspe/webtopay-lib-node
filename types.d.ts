declare var require: (path: string) => any;
declare var module: any;

export interface Config {
  projectid: string;
  password: string;
  accepturl: string;
  cancelurl: string;
  callbackurl: string;
  test?: string;
}

export interface Callback {
  data: string;
  ss1: string;
  ss2: string;
}

export interface UrlQuery {
  [key: string]: string | string[];
}

/**
 * All descriptions here:
 * https://developers.paysera.com/en/payments/current#request-parameters
 */
export interface WebToPayRequest {
  orderid: string;
  lang?: string;
  amount: string;
  currency?: string;
  payment?: string;
  country?: string;
  paytext?: string;
  p_firstname?: string;
  p_lastname?: string;
  p_email?: string;
  p_street?: string;
  p_city?: string;
  p_state?: string;
  p_zip?: string;
  p_countrycode?: string;
  only_payments?: string;
  disalow_payments?: string;
  time_limit?: string;
  personcode?: string;
}

export interface WebToPayNotification {
  projectid: string;
  orderid: string;
  lang: string;
  amount: string;
  currenc: string;
  payment: string;
  country: string;
  paytext: string;
  name: string;
  surename: string;
  /**
   *  0 - payment has not been executed
   *  1 - payment successful
   *  2 - payment order accepted, but not yet executed (this status does not guarantee execution of the payment)
   *  3 - additional payment information
   */
  status: '0' | '1' | '2' | '3';
  test: string;
  p_email: string;
  requestid: string;
  payment_country: string;
  payer_ip_country: string;
  payer_country: string;
  payamount: string;
  paycurrency: string;
  version: string;
  account: string;
  /**
   * 0 - personal code is yet unknown
   * 1 - personal code matches
   * 2 - personal code does not matches
   * 3 - personal code is unknown
   */
  personcodestatus: '0' | '1' | '2' | '3';
}
