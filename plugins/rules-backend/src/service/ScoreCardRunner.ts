import 'http';

import { getJSONMappingForYard } from './InputServiceConnection';
import { yardFiles } from './YardFiles';
import { callYardServer } from './YardServerConnection';

// TODO no files set
// TODO Figure how to report connection to service broken
// TODO how to configure the individual service, not every scorecard is for everything

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
  const results: Record[] = [];

  const yardModules = await yardFiles();
  for await (const yardModule of yardModules) {
    try {
      const configuration = yardModule.configuration;

      const yardInputs = await getJSONMappingForYard(configuration);

      for await (const yardContent of yardModule.content) {
        const result = await callYardServer(yardContent.json, yardInputs);
        results.push({
          status: 'aaa',
          measureValue: result.Score,
          measureName: yardContent.name,
          maxValue: 100,
          yaml: yardContent.yaml,
          thresholds: [
            {
              name: 'Blocking',
              value: 50,
            },
            {
              name: 'Decent',
              value: 90,
            },
          ],
        });
      }
    } catch (e) {
      console.log('Failed to add module');
    }
  }

  console.log(' result count is ' + results.length);
  return results;
}
