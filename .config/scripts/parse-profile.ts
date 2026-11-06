import { parseLanguage } from './parse-language.ts';
import { array } from './array.ts';
import { parseContact } from './parse-contact.ts';
import { parseGroup } from './parse-group.ts';
import { parseInterest } from './parse-interest.ts';
import type { Profile } from './profile.types.ts';
import { record } from './record.ts';
import { safeURL } from './safe-url.ts';
import { text } from './text.ts';
import { validateProfile } from './validate-profile.ts';

export function parseProfile(value: unknown): Profile {
  const document = record(value);

  const source = record(document['source']);

  const country = record(document['birth_country']);

  if (
    document['version'] !== 1 ||
    document['language'] !== 'en' ||
    source['url'] !== 'https://guesant.net/profile.yaml'
  ) {
    throw new Error('Unsupported profile contract');
  }

  const languages = array(document['spoken_languages']);

  const contacts = array(document['contacts']);

  const interests = array(document['interests']);

  const technologies = array(document['technologies']);

  const profile: Profile = {
    name: text(document['name']),
    username: text(document['username']),
    revision: text(source['revision']),
    spokenLanguages: languages.map(parseLanguage),
    birthPlace: text(document['birth_place']),
    residence: text(document['residence']),
    birthCountry: {
      name: text(country['name']),
      url: safeURL(country['url']),
    },
    contacts: contacts.map(parseContact),
    interests: interests.map(parseInterest),
    technologies: technologies.map(parseGroup),
  };

  return validateProfile(profile);
}
