import { record } from '../utils/record.ts';
import { text } from '../utils/text.ts';
import type { EnglishTextReader } from './profile-operations.types.ts';

export class DefaultEnglishTextReader implements EnglishTextReader {
  englishText(value: unknown): string {
    const labels = record(value);

    return text(labels['en']);
  }
}
