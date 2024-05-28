import fs from 'fs-extra';
import yaml from 'js-yaml';

import * as path from 'path';

export interface YardContent {
  fileName: string;
  yaml: string;
  json: any;
}

async function readFiles(folder: string): Promise<string[]> {
  return new Promise<string[]>(resolve => {
    fs.readdir(folder, (err, files) => {
      resolve(files);
    });
  });
}

export async function yardFiles(): Promise<YardContent[]> {
  const result: YardContent[] = [];
  const folder: string = path.join(__dirname, '../yard-files');
  const files: string[] = await readFiles(folder);

  for await (const file of files) {
    const location = path.join(folder, file);
    await fs.readFile(location, 'utf8').then(yamlYard => {
      const json = yaml.load(yamlYard);

      result.push({
        fileName: file,
        yaml: yamlYard,
        json: json,
      });
    });
  }

  return new Promise<YardContent[]>(resolve => {
    resolve(result);
  });
}
