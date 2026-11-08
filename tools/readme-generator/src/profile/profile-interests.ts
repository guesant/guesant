import { array } from '../utils/array.ts';
import { record } from '../utils/record.ts';
import type { InterestParser } from './parse/profile-parsers.types.ts';
import type { Interest } from './profile.types.ts';
import type {
  ProfileInterestSelector,
  PublicationPolicy,
} from './profile-operations.types.ts';

export class DefaultProfileInterestSelector implements ProfileInterestSelector {
  private readonly interestParser: InterestParser;
  private readonly publicationPolicy: PublicationPolicy;

  constructor(
    interestParser: InterestParser,
    publicationPolicy: PublicationPolicy,
  ) {
    this.interestParser = interestParser;
    this.publicationPolicy = publicationPolicy;
  }

  profileInterests(value: unknown): Interest[] {
    const values = array(value);

    const interests: Interest[] = [];

    for (const value of values) {
      const entry = record(value);

      if (!this.publicationPolicy.published(entry)) {
        continue;
      }

      const labels = record(entry['labels']);

      if (labels['en'] === undefined) {
        continue;
      }

      const interest = this.interestParser.parseInterest(entry);

      interests.push(interest);
    }

    return interests;
  }
}
