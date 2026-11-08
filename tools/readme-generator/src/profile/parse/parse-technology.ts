import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import type { Technology } from '../profile.types.ts';
import type { ProfileUrlValidator } from '../profile-operations.types.ts';
import type { TechnologyParser } from './profile-parsers.types.ts';

export class DefaultTechnologyParser implements TechnologyParser {
  private readonly profileUrlValidator: ProfileUrlValidator;

  constructor(profileUrlValidator: ProfileUrlValidator) {
    this.profileUrlValidator = profileUrlValidator;
  }

  parseTechnology(value: unknown): Technology {
    const item = record(value);

    const url = this.profileUrlValidator.safeURL(item['url']);

    if (!url.startsWith('https://')) {
      throw new Error('Technology URLs must use HTTPS');
    }

    return {
      id: text(item['id']),
      name: text(item['name']),
      url,
    };
  }
}
