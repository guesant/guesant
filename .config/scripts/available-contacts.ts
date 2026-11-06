import { array } from './array.ts';
import { parseContact } from './parse-contact.ts';
import type { Contact } from './profile.types.ts';
import { published } from './published.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export function availableContacts(
  value: unknown,
  requested: Set<string>,
): Map<string, Contact> {
  const groups = array(value);

  const available = new Map<string, Contact>();

  for (const value of groups) {
    const section = record(value);

    if (!published(section)) {
      continue;
    }

    const links = array(section['links']);

    for (const value of links) {
      const link = record(value);

      if (!published(link)) {
        continue;
      }

      const id = text(link['id']);

      if (!requested.has(id)) {
        continue;
      }

      if (available.has(id)) {
        throw new Error('Duplicate public contact identifier');
      }

      const contact = parseContact(link);

      available.set(id, contact);
    }
  }

  return available;
}
