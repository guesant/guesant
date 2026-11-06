import { text } from './text.ts';

export function parseLanguage(value: unknown): string {
  return text(value);
}
