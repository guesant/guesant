import { array } from './array.ts';
import { parseTechnology } from './parse-technology.ts';
import type { TechnologyGroup } from './profile.types.ts';
import { published } from './published.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export function parseGroup(value: unknown): TechnologyGroup {
  const group = record(value);

  const labels = record(group['labels']);

  const items = array(group['items']);

  const technologies: TechnologyGroup['items'] = [];

  for (const value of items) {
    const item = record(value);

    if (published(item)) {
      const technology = parseTechnology(item);

      technologies.push(technology);
    }
  }

  return {
    id: text(group['id']),
    title: text(labels['en']),
    items: technologies,
  };
}
