import type {
  Contact,
  Interest,
  Profile,
  ProfileDocuments,
  SourceRevisions,
  Technology,
  TechnologyGroup,
} from '../profile.types.ts';

export type ContactParser = {
  parseContact(value: unknown): Contact;
};

export type TechnologyGroupParser = {
  parseGroup(value: unknown): TechnologyGroup;
};

export type InterestParser = {
  parseInterest(value: unknown): Interest;
};

export type LanguageParser = {
  parseLanguage(value: unknown): string;
};

export type ProfileParser = {
  parseProfile(sources: ProfileDocuments, revisions: SourceRevisions): Profile;
};

export type TechnologyParser = {
  parseTechnology(value: unknown): Technology;
};
