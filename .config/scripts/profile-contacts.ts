import { array } from './array.ts';
import { availableContacts } from './available-contacts.ts';
import type { Contact } from './profile.types.ts';
import { text } from './text.ts';

export function profileContacts(
  identifiers: unknown,
  sections: unknown,
): Contact[] {
  const selected = array(identifiers);

  const requested = new Set<string>();

  for (const value of selected) {
    const id = text(value);

    if (!/^[a-z][a-z0-9-]{0,127}$/u.test(id) || requested.has(id)) {
      throw new Error('Invalid or duplicate contact identifier');
    }

    requested.add(id);
  }

  const available = availableContacts(sections, requested);

  const contacts: Contact[] = [];

  for (const entry of requested) {
    const contact = available.get(entry);

    if (contact) {
      contacts.push(contact);
    }
  }

  return contacts;
}
