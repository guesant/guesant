import { array } from './array.ts';
import { parseGroup } from './parse-group.ts';
import type { TechnologyGroup } from './profile.types.ts';
import { published } from './published.ts';
import { record } from './record.ts';

export function profileTechnologies(value: unknown): TechnologyGroup[] {
  const catalog = record(value);

  if (catalog['version'] !== 1) {
    throw new Error('Unsupported technologies catalog');
  }

  const values = array(catalog['groups']);

  const groups: TechnologyGroup[] = [];

  for (const value of values) {
    const group = record(value);

    if (published(group)) {
      const parsed = parseGroup(group);

      if (parsed.items.length > 0) {
        groups.push(parsed);
      }
    }
  }

  return groups;
}
