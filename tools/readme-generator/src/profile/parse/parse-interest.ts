import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import type { Interest } from '../profile.types.ts';
import type { InterestParser } from './profile-parsers.types.ts';

export class DefaultInterestParser implements InterestParser {
  parseInterest(value: unknown): Interest {
    const item = record(value);

    const labels = record(item['labels']);

    const english = record(labels['en']);

    return {
      id: text(item['id']),
      title: text(english['title']),
      description: text(english['description'] ?? '', true),
    };
  }
}
