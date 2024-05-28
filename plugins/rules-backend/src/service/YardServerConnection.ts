import 'http';

import axios from 'axios';

import { yardFiles } from './YardFiles';

const dataTemplate = {
  yard: {},
  input: {},
};

const testData = {
  'Bronze Complete': true,
  'Silver Complete': false,
  'Gold Complete': false,
};

// TODO no files set
// TODO connection to service broken
// TODO how to configure the individual service, not every scorecard is for everything

export class YardServerConnection {
  async run(): Promise<any> {
    const yardContents = await yardFiles();
    for await (const yardContent of yardContents) {
      const result = await this.call(yardContent.json);
      console.log('Result ' + JSON.stringify(result));
      // TODO what to do with this
    }
    return new Promise<any>(x => {
      x('');
    });
  }

  private async call(yardJson: JSON) {
    let url = 'http://localhost:8080/yard';

    let requestBody = dataTemplate;
    requestBody.yard = yardJson;
    requestBody.input = testData;

    const resp = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return resp.data;
  }
}
