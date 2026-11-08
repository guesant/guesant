import { array } from '../../utils/array.ts';
import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import type { TechnologyGroup } from '../profile.types.ts';
import type { PublicationPolicy } from '../profile-operations.types.ts';
import type {
  TechnologyGroupParser,
  TechnologyParser,
} from './profile-parsers.types.ts';

export class DefaultTechnologyGroupParser implements TechnologyGroupParser {
  private readonly technologyParser: TechnologyParser;
  private readonly publicationPolicy: PublicationPolicy;

  constructor(
    technologyParser: TechnologyParser,
    publicationPolicy: PublicationPolicy,
  ) {
    this.technologyParser = technologyParser;
    this.publicationPolicy = publicationPolicy;
  }

  parseGroup(value: unknown): TechnologyGroup {
    const group = record(value);

    const labels = record(group['labels']);

    const items = array(group['items']);

    const technologies: TechnologyGroup['items'] = [];

    for (const value of items) {
      const item = record(value);

      if (this.publicationPolicy.published(item)) {
        const technology = this.technologyParser.parseTechnology(item);

        technologies.push(technology);
      }
    }

    return {
      id: text(group['id']),
      title: text(labels['en']),
      items: technologies,
    };
  }
}
