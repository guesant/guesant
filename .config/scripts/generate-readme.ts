import { rename, writeFile } from 'node:fs/promises';
import { loadProfile } from './load-profile.ts';
import { loadStyles } from './load-styles.ts';
import { renderReadme } from './render-readme.ts';

export async function generateReadme(
  localFile?: string,
  destination = 'README.md',
): Promise<void> {
  const profile = await loadProfile(localFile);

  const styles = await loadStyles();

  const markdown = renderReadme(profile, styles);

  const temporary = `${destination}.tmp`;

  await writeFile(temporary, markdown, 'utf8');

  await rename(temporary, destination);
}
