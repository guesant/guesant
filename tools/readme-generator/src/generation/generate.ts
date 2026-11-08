import { createReadmeContainer } from '../composition/create-readme-container.ts';
import { serviceSymbols } from '../composition/service-symbols.ts';
import type { ReadmeGenerator } from './generation.types.ts';
import { resolve } from 'node:path';

const container = createReadmeContainer();

const generator = container.get<ReadmeGenerator>(
  serviceSymbols.readmeGenerator,
);

const destination = resolve(import.meta.dirname, '../../../../README.md');

const revisions = await generator.generate({
  sources: {
    lobbyDirectory: process.env['PROFILE_LOBBY_DIR'],
    resumeDirectory: process.env['PROFILE_RESUME_DIR'],
  },
  destination,
});

console.log('Profile sources:', revisions);
