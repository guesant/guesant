import type { Technology } from './profile.types.ts';
import { record } from './record.ts';
import { safeURL } from './safe-url.ts';
import { text } from './text.ts';

export function parseTechnology(value: unknown): Technology {
  const item = record(value);

  return {
    id: text(item['id']),
    name: text(item['name']),
    url: safeURL(item['url']),
  };
}
