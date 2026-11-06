import { loadProfile } from './load-profile.ts';
import { loadStyles } from './load-styles.ts';
import type { SourceOptions, SourceRevisions } from './profile.types.ts';
import { renderReadme } from './render-readme.ts';
import { rename, writeFile } from 'node:fs/promises';

export async function generateReadme(
  options: SourceOptions = {},
  destination = 'README.md',
): Promise<SourceRevisions> {
  const profile = await loadProfile(options);

  const styles = await loadStyles();

  const markdown = renderReadme(profile, styles);

  const temporary = `${destination}.tmp`;

  await writeFile(temporary, markdown, 'utf8');

  await rename(temporary, destination);

  return profile.revisions;
}
