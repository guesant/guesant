import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { parseProfile } from './parse-profile.ts';
import type { Profile } from './profile.types.ts';
import { responseText } from './response-text.ts';

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
        'user-agent':
          'guesant-profile-generator/1.0 (+https://github.com/guesant/guesant)',
      },
    });

    source = await responseText(response);
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
