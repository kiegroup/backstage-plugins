export interface YardContent {
  name: string;
  fileName: string;
  yaml: string;
  json: any;
}

export interface YardModule {
  configuration: Configuration;
  content: YardContent[];
}

export interface Output {
  name: string;
  from: string;
}

export interface Configuration {
  name: string;
  api: string;
  outputs: Output[];
}
