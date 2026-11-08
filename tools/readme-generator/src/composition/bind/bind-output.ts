import type { ReadmeWriter } from '../../generation/generation.types.ts';
import { AtomicReadmeWriter } from '../../output/write-readme.ts';
import { serviceSymbols } from '../service-symbols.ts';
import type { Container } from 'inversify';

export function bindOutput(container: Container): void {
  container
    .bind<ReadmeWriter>(serviceSymbols.writeReadme)
    .to(AtomicReadmeWriter);
}
