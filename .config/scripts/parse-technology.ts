import type { Technology } from './profile.types.ts';
import { record } from './record.ts';
import { safeURL } from './safe-url.ts';
import { text } from './text.ts';

export function parseTechnology(value: unknown): Technology {
  const item = record(value);

  const url = safeURL(item['url']);

  if (!url.startsWith('https://')) {
    throw new Error('Technology URLs must use HTTPS');
  }

  return {
    id: text(item['id']),
    name: text(item['name']),
    url,
  };
}
