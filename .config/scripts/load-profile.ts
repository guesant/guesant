import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { parseProfile } from './parse-profile.ts';
import type { Profile } from './profile.types.ts';

export async function loadProfile(localFile?: string): Promise<Profile> {
  let source: string;

  if (localFile) {
    source = await readFile(localFile, 'utf8');
  } else {
    const response = await fetch('https://guesant.net/profile.yaml', {
      redirect: 'error',
      signal: AbortSignal.timeout(15000),
      headers: {
        accept: 'application/yaml',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Profile download failed: HTTP ${String(response.status)}`,
      );
    }

    source = await response.text();
  }

  if (Buffer.byteLength(source) > 1048576) {
    throw new Error('Profile exceeds size limit');
  }

  const document: unknown = parse(source, {
    uniqueKeys: true,
    maxAliasCount: 0,
  });

  return parseProfile(document);
}
