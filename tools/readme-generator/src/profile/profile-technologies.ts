import { array } from '../utils/array.ts';
import { record } from '../utils/record.ts';
import type { TechnologyGroupParser } from './parse/profile-parsers.types.ts';
import type { TechnologyGroup } from './profile.types.ts';
import type {
  ProfileTechnologySelector,
  PublicationPolicy,
} from './profile-operations.types.ts';

export class DefaultProfileTechnologySelector
  implements ProfileTechnologySelector
{
  private readonly technologyGroupParser: TechnologyGroupParser;
  private readonly publicationPolicy: PublicationPolicy;

  constructor(
    technologyGroupParser: TechnologyGroupParser,
    publicationPolicy: PublicationPolicy,
  ) {
    this.technologyGroupParser = technologyGroupParser;
    this.publicationPolicy = publicationPolicy;
  }

  profileTechnologies(value: unknown): TechnologyGroup[] {
    const catalog = record(value);

    if (catalog['version'] !== 1) {
      throw new Error('Unsupported technologies catalog');
    }

    const values = array(catalog['groups']);

    const groups: TechnologyGroup[] = [];

    for (const value of values) {
      const group = record(value);

      if (this.publicationPolicy.published(group)) {
        const parsed = this.technologyGroupParser.parseGroup(group);

        if (parsed.items.length > 0) {
          groups.push(parsed);
        }
      }
    }

    return groups;
  }
}
