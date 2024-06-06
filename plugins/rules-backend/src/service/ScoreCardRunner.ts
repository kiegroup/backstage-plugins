import 'http';

import { yardFiles } from './YardFiles';
import { call } from './YardServerConnection';

// TODO no files set
// TODO connection to service broken
// TODO how to configure the individual service, not every scorecard is for everything

export interface Record {
  status: String;
  measureValue: number;
  measureName: String;
}

export async function runScorecards(): Promise<Record[]> {
  const results: Record[] = [];

  const yardModules = await yardFiles();
  for await (const yardModule of yardModules) {
    try {
      const configuration = yardModule.configuration;

      for await (const yardContent of yardModule.content) {
        const result = await call(yardContent.json);
        console.log('Result ' + JSON.stringify(result));
        results.push({
          status: 'aaa',
          measureValue: result.Score,
          measureName: yardContent.name,
        });
      }
    } catch (e) {
      console.log('Failed to add module');
    }
  }

  console.log(' result count is ' + results.length);
  return results;
}
