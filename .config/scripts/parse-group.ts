import { array } from './array.ts';
import { parseTechnology } from './parse-technology.ts';
import type { TechnologyGroup } from './profile.types.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export function parseGroup(value: unknown): TechnologyGroup {
  const group = record(value);

  const labels = record(group['labels']);

  const items = array(group['items']);

  return {
    id: text(group['id']),
    title: text(labels['en']),
    items: items.map(parseTechnology),
  };
}
