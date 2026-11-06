import { download } from './download.ts';
import type { RepositorySource } from './profile.types.ts';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

export async function loadYaml(
  source: RepositorySource,
  path: string,
): Promise<unknown> {
  let document: string;

  if (source.directory) {
    const filename = join(source.directory, path);

    document = await readFile(filename, 'utf8');
  } else {
    const url = `https://raw.githubusercontent.com/guesant/${source.repository}/${source.revision}/${path}`;

    document = await download(url);
  }

  if (Buffer.byteLength(document) > 1048576) {
    throw new Error('Source YAML exceeds size limit');
  }

  return parse(document, {
    uniqueKeys: true,
    maxAliasCount: 0,
  }) as unknown;
}
