import 'http';

import axios from 'axios';

const dataTemplate = {
  yard: {},
  input: {},
};

export async function callYardServer(yardJson: JSON, yardInput: JSON) {
  const url = 'http://localhost:8080/yard';

  const requestBody = dataTemplate;
  requestBody.yard = yardJson;
  requestBody.input = yardInput;

  const resp = await axios.post(url, requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return resp.data;
}
