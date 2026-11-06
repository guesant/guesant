import { array } from './array.ts';
import { parseInterest } from './parse-interest.ts';
import type { Interest } from './profile.types.ts';
import { published } from './published.ts';
import { record } from './record.ts';

export function profileInterests(value: unknown): Interest[] {
  const values = array(value);

  const interests: Interest[] = [];

  for (const value of values) {
    const entry = record(value);

    if (!published(entry)) {
      continue;
    }

    const labels = record(entry['labels']);

    if (labels['en'] === undefined) {
      continue;
    }

    const interest = parseInterest(entry);

    interests.push(interest);
  }

  return interests;
}
