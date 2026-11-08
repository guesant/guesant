import { array } from '../../utils/array.ts';
import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import type {
  Profile,
  ProfileDocuments,
  SourceRevisions,
} from '../profile.types.ts';
import type {
  EnglishTextReader,
  ProfileContactSelector,
  ProfileInterestSelector,
  ProfileTechnologySelector,
  ProfileUrlValidator,
  ProfileValidator,
} from '../profile-operations.types.ts';
import type { LanguageParser, ProfileParser } from './profile-parsers.types.ts';

export class DefaultProfileParser implements ProfileParser {
  private readonly englishTextReader: EnglishTextReader;
  private readonly languageParser: LanguageParser;
  private readonly profileContactSelector: ProfileContactSelector;
  private readonly profileInterestSelector: ProfileInterestSelector;
  private readonly profileTechnologySelector: ProfileTechnologySelector;
  private readonly profileUrlValidator: ProfileUrlValidator;
  private readonly profileValidator: ProfileValidator;

  constructor(
    englishTextReader: EnglishTextReader,
    languageParser: LanguageParser,
    profileContactSelector: ProfileContactSelector,
    profileInterestSelector: ProfileInterestSelector,
    profileTechnologySelector: ProfileTechnologySelector,
    profileUrlValidator: ProfileUrlValidator,
    profileValidator: ProfileValidator,
  ) {
    this.englishTextReader = englishTextReader;
    this.languageParser = languageParser;
    this.profileContactSelector = profileContactSelector;
    this.profileInterestSelector = profileInterestSelector;
    this.profileTechnologySelector = profileTechnologySelector;
    this.profileUrlValidator = profileUrlValidator;
    this.profileValidator = profileValidator;
  }

  parseProfile(sources: ProfileDocuments, revisions: SourceRevisions): Profile {
    const document = record(sources.personal);

    const links = record(sources.links);

    const identity = record(links['profile']);

    const editorial = record(sources.editorial);

    const entries = record(editorial['entries']);

    const country = record(document['birth_country']);

    if (document['version'] !== 1) {
      throw new Error('Unsupported personal profile');
    }

    const languages = array(document['spoken_languages']);

    const parseLanguage = this.languageParser.parseLanguage.bind(
      this.languageParser,
    );

    const profile: Profile = {
      name: text(document['full_name']),
      username: text(identity['username']),
      revisions,
      spokenLanguages: languages.map(parseLanguage),
      birthPlace: this.englishTextReader.englishText(document['birth_place']),
      residence: this.englishTextReader.englishText(document['residence']),
      birthCountry: {
        name: this.englishTextReader.englishText(country['labels']),
        url: this.profileUrlValidator.safeURL(country['url']),
      },
      contacts: this.profileContactSelector.profileContacts(
        document['contact_links'],
        links['sections'],
      ),
      interests: this.profileInterestSelector.profileInterests(
        entries['interests'],
      ),
      technologies: this.profileTechnologySelector.profileTechnologies(
        sources.technologies,
      ),
    };

    return this.profileValidator.validateProfile(profile);
  }
}
