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

export interface IParsedUrlQuery {
  [key: string]: string | string[];
}

export interface IParsedUrlQueryInput {
  [key: string]: NodeJS.PoorMansUnknown;
}
