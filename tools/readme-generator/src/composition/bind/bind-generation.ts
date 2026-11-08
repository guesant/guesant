import { DefaultReadmeGenerator } from '../../generation/generate-readme.ts';
import type { ReadmeGenerator } from '../../generation/generation.types.ts';
import { configureInjection } from '../configure-injection.ts';
import { serviceSymbols } from '../service-symbols.ts';
import type { Container } from 'inversify';

configureInjection(DefaultReadmeGenerator, [
  serviceSymbols.loadProfile,
  serviceSymbols.loadStyles,
  serviceSymbols.renderReadme,
  serviceSymbols.writeReadme,
]);

export function bindGeneration(container: Container): void {
  container
    .bind<ReadmeGenerator>(serviceSymbols.readmeGenerator)
    .to(DefaultReadmeGenerator);
}
