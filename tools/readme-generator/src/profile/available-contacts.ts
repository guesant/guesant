import { array } from '../utils/array.ts';
import { record } from '../utils/record.ts';
import { text } from '../utils/text.ts';
import type { ContactParser } from './parse/profile-parsers.types.ts';
import type { Contact } from './profile.types.ts';
import type {
  AvailableContactSelector,
  PublicationPolicy,
} from './profile-operations.types.ts';

export class DefaultAvailableContactSelector
  implements AvailableContactSelector
{
  private readonly contactParser: ContactParser;
  private readonly publicationPolicy: PublicationPolicy;

  constructor(
    contactParser: ContactParser,
    publicationPolicy: PublicationPolicy,
  ) {
    this.contactParser = contactParser;
    this.publicationPolicy = publicationPolicy;
  }

  availableContacts(
    value: unknown,
    requested: Set<string>,
  ): Map<string, Contact> {
    const groups = array(value);

    const available = new Map<string, Contact>();

    for (const value of groups) {
      const section = record(value);

      if (!this.publicationPolicy.published(section)) {
        continue;
      }

      const links = array(section['links']);

      this.collectContacts(links, requested, available);
    }

    return available;
  }

  private collectContacts(
    links: unknown[],
    requested: Set<string>,
    available: Map<string, Contact>,
  ): void {
    for (const value of links) {
      const link = record(value);

      if (!this.publicationPolicy.published(link)) {
        continue;
      }

      const id = text(link['id']);

      if (!requested.has(id)) {
        continue;
      }

      if (available.has(id)) {
        throw new Error('Duplicate public contact identifier');
      }

      const contact = this.contactParser.parseContact(link);

      available.set(id, contact);
    }
  }
}
