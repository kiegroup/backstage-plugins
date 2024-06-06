import 'http';

import axios from 'axios';

const dataTemplate = {
  yard: {},
  input: {},
};

const testData = {
  'Number of Jira Issues': 10,
};

export async function call(yardJson: JSON) {
  const url = 'http://localhost:8080/yard';

  const requestBody = dataTemplate;
  requestBody.yard = yardJson;
  requestBody.input = testData;

  const resp = await axios.post(url, requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return resp.data;
}
