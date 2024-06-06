import fs from 'fs-extra';
import yaml from 'js-yaml';

import * as path from 'path';

export interface YardContent {
  name: string;
  fileName: string;
  yaml: string;
  json: any;
}

export interface YardModule {
  configuration: any;
  content: YardContent[];
}

async function readFiles(folder: string): Promise<string[]> {
  return new Promise<string[]>(resolve => {
    fs.readdir(folder, (err, files) => {
      resolve(files);
    });
  });
}

async function getModule(
  location: string,
  folderFiles: string[],
): Promise<YardModule> {
  const configurationYml = await fs.readFile(
    path.join(location, 'configuration.yml'),
    'utf8',
  );
  const contents: YardContent[] = [];

  for await (const file of folderFiles) {
    if (file !== 'configuration.yml') {
      await fs.readFile(path.join(location, file), 'utf8').then(yamlYard => {
        const json = yaml.load(yamlYard);

        contents.push({
          name: json.name,
          fileName: file,
          yaml: yamlYard,
          json: json,
        });
      });
    }
  }

  return {
    configuration: yaml.load(configurationYml),
    content: contents,
  };
}

export async function yardFiles(): Promise<YardModule[]> {
  const result: YardModule[] = [];
  const rootFolder: string = path.join(__dirname, '../yard-files'); // TODO get the name of this folder/folders from backstage plugin configuration
  const files: string[] = await readFiles(rootFolder);

  for await (const folderName of files) {
    const location = path.join(rootFolder, folderName);
    const stats = fs.lstatSync(location);

    if (stats.isDirectory()) {
      const folderFiles = await readFiles(location);

      if (folderFiles.indexOf('configuration.yml') >= 0) {
        const module = await getModule(location, folderFiles);
        result.push(module);
      }
    }
  }

  return result;
}
