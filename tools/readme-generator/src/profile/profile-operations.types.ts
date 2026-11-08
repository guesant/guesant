import type {
  Contact,
  Interest,
  Profile,
  TechnologyGroup,
} from './profile.types.ts';

export type AvailableContactSelector = {
  availableContacts(
    value: unknown,
    requested: Set<string>,
  ): Map<string, Contact>;
};

export type EnglishTextReader = {
  englishText(value: unknown): string;
};

export type ProfileContactSelector = {
  profileContacts(identifiers: unknown, sections: unknown): Contact[];
};

export type ProfileInterestSelector = {
  profileInterests(value: unknown): Interest[];
};

export type ProfileTechnologySelector = {
  profileTechnologies(value: unknown): TechnologyGroup[];
};

export type PublicationPolicy = {
  published(entry: Record<string, unknown>): boolean;
};

export type ProfileUrlValidator = {
  safeURL(value: unknown): string;
};

export type ProfileIdentifierValidator = {
  uniqueItems(
    items: {
      id: string;
    }[],
  ): void;
};

export type ProfileValidator = {
  validateProfile(profile: Profile): Profile;
};
