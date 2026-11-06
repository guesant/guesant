import type { Contact } from './profile.types.ts';
import { record } from './record.ts';
import { safeURL } from './safe-url.ts';
import { text } from './text.ts';

export function parseContact(value: unknown): Contact {
  const item = record(value);

  const labels = record(item['labels']);

  const english = record(labels['en']);

  let destination = item['url'];

  if (item['localized_urls'] !== undefined) {
    const urls = record(item['localized_urls']);

    if (urls['en']) {
      destination = urls['en'];
    }
  }

  return {
    id: text(item['id']),
    title: text(english['title']),
    url: safeURL(destination),
  };
}
