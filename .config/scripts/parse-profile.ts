import { array } from './array.ts';
import { englishText } from './english-text.ts';
import { parseLanguage } from './parse-language.ts';
import type {
  Profile,
  ProfileDocuments,
  SourceRevisions,
} from './profile.types.ts';
import { profileContacts } from './profile-contacts.ts';
import { profileInterests } from './profile-interests.ts';
import { profileTechnologies } from './profile-technologies.ts';
import { record } from './record.ts';
import { safeURL } from './safe-url.ts';
import { text } from './text.ts';
import { validateProfile } from './validate-profile.ts';

export function parseProfile(
  sources: ProfileDocuments,
  revisions: SourceRevisions,
): Profile {
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

  const profile: Profile = {
    name: text(document['full_name']),
    username: text(identity['username']),
    revisions,
    spokenLanguages: languages.map(parseLanguage),
    birthPlace: englishText(document['birth_place']),
    residence: englishText(document['residence']),
    birthCountry: {
      name: englishText(country['labels']),
      url: safeURL(country['url']),
    },
    contacts: profileContacts(document['contact_links'], links['sections']),
    interests: profileInterests(entries['interests']),
    technologies: profileTechnologies(sources.technologies),
  };

  return validateProfile(profile);
}
