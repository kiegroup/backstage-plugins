import 'http';

import axios from 'axios';

// TODO Figure how to report connection to service broken

export interface Record {
  status: String;
  measureValue: number;
  measureName: String;
  maxValue: number;
  yaml: string;
  thresholds: Threshold[];
}

export interface Threshold {
  name: string;
  value: number;
}

export async function runScorecards(): Promise<Record[]> {
  const url = 'http://localhost:8080/scorecards/run';

  const resp = await axios.get(url);

  return resp.data;
}
