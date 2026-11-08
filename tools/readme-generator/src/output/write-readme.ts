import type { ReadmeWriter } from '../generation/generation.types.ts';
import { mkdtemp, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export class AtomicReadmeWriter implements ReadmeWriter {
  async writeReadme(destination: string, markdown: string): Promise<void> {
    const directory = dirname(destination);

    const prefix = join(directory, '.readme-generator-');

    const temporaryDirectory = await mkdtemp(prefix);

    const temporaryFile = join(temporaryDirectory, 'README.md');

    try {
      await writeFile(temporaryFile, markdown, 'utf8');
      await rename(temporaryFile, destination);
    } finally {
      await rm(temporaryDirectory, {
        recursive: true,
        force: true,
      });
    }
  }
}
