import { record } from '../../utils/record.ts';
import type { EnglishTextReader } from '../profile-operations.types.ts';
import type { LanguageParser } from './profile-parsers.types.ts';

export class DefaultLanguageParser implements LanguageParser {
  private readonly englishTextReader: EnglishTextReader;

  constructor(englishTextReader: EnglishTextReader) {
    this.englishTextReader = englishTextReader;
  }

  parseLanguage(value: unknown): string {
    const language = record(value);

    return this.englishTextReader.englishText(language['labels']);
  }
}
