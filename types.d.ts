declare var require: (path: string) => any;
declare var module: any;

export interface IConfig {
  projectid: string;
  password: string;
  accepturl: string;
  cancelurl: string;
  callbackurl: string;
  test?: number;
}

export interface ICallback {
  data: string;
  ss1: string;
  ss2: string;
}

export interface IUrlQuery {
  [key: string]: string | string[];
}
