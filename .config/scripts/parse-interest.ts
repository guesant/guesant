import type { Interest } from './profile.types.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export function parseInterest(value: unknown): Interest {
  const item = record(value);

  const labels = record(item['labels']);

  const english = record(labels['en']);

  return {
    id: text(item['id']),
    title: text(english['title']),
    description: text(english['description'] ?? '', true),
  };
}
