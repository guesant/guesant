import { record } from './record.ts';
import { text } from './text.ts';

export function englishText(value: unknown): string {
  const labels = record(value);

  return text(labels['en']);
}
