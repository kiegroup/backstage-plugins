import axios from 'axios';

import { Configuration } from './YardModule';

export async function getJSONMappingForYard(
  configuration: Configuration,
): Promise<JSON> {
  const result = {} as JSON;

  const response = await axios.get(configuration.api);

  const data = response.data;

  if (configuration.outputs != null) {
    for (const output of configuration.outputs) {
      const name = output.name as string;
      const from = output.from as string;

      if (data[from] === undefined) {
        console.log(
          `Configuration: For Card '${configuration.name}' :: Value '${from}' missing from the input data.`,
        );
        // TODO log and error and report in client side, or here?
      } else {
        result[name] = data[from];
      }
    }
  }

  return result;
}
