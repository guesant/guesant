import { englishText } from './english-text.ts';
import { record } from './record.ts';

export function parseLanguage(value: unknown): string {
  const language = record(value);

  return englishText(language['labels']);
}
