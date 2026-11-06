import type { Interest } from './profile.types.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export function parseInterest(value: unknown): Interest {
  const item = record(value);

  return {
    id: text(item['id']),
    title: text(item['title']),
    description: text(item['description'], true),
  };
}
