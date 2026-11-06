import type { Contact } from './profile.types.ts';
import { record } from './record.ts';
import { safeURL } from './safe-url.ts';
import { text } from './text.ts';

export function parseContact(value: unknown): Contact {
  const item = record(value);

  return {
    id: text(item['id']),
    title: text(item['title']),
    url: safeURL(item['url']),
  };
}
