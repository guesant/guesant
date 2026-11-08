import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import type { Contact } from '../profile.types.ts';
import type { ProfileUrlValidator } from '../profile-operations.types.ts';
import type { ContactParser } from './profile-parsers.types.ts';

export class DefaultContactParser implements ContactParser {
  private readonly profileUrlValidator: ProfileUrlValidator;

  constructor(profileUrlValidator: ProfileUrlValidator) {
    this.profileUrlValidator = profileUrlValidator;
  }

  parseContact(value: unknown): Contact {
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
      url: this.profileUrlValidator.safeURL(destination),
    };
  }
}
