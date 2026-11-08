import type { RepositorySource } from '../repository-source/repository-source.types.ts';
import type { SourceDownloader } from '../sources.types.ts';
import type { YamlLoader } from './load.types.ts';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

export class DefaultYamlLoader implements YamlLoader {
  private readonly sourceDownloader: SourceDownloader;

  constructor(sourceDownloader: SourceDownloader) {
    this.sourceDownloader = sourceDownloader;
  }

  async loadYaml(source: RepositorySource, path: string): Promise<unknown> {
    let document: string;

    if (source.directory) {
      const filename = join(source.directory, path);

      document = await readFile(filename, 'utf8');
    } else {
      const url = `https://raw.githubusercontent.com/guesant/${source.repository}/${source.revision}/${path}`;

      document = await this.sourceDownloader.download(url);
    }

    if (Buffer.byteLength(document) > 1048576) {
      throw new Error('Source YAML exceeds size limit');
    }

    return parse(document, {
      uniqueKeys: true,
      maxAliasCount: 0,
    }) as unknown;
  }
}
