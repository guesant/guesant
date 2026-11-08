import { DefaultAvailableContactSelector } from '../../profile/available-contacts.ts';
import { DefaultEnglishTextReader } from '../../profile/english-text.ts';
import { DefaultProfileContactSelector } from '../../profile/profile-contacts.ts';
import { DefaultProfileInterestSelector } from '../../profile/profile-interests.ts';
import type {
  AvailableContactSelector,
  EnglishTextReader,
  ProfileContactSelector,
  ProfileIdentifierValidator,
  ProfileInterestSelector,
  ProfileTechnologySelector,
  ProfileUrlValidator,
  ProfileValidator,
  PublicationPolicy,
} from '../../profile/profile-operations.types.ts';
import { DefaultProfileTechnologySelector } from '../../profile/profile-technologies.ts';
import { DefaultPublicationPolicy } from '../../profile/published.ts';
import { DefaultProfileUrlValidator } from '../../profile/safe-url.ts';
import { DefaultProfileIdentifierValidator } from '../../profile/unique-items.ts';
import { DefaultProfileValidator } from '../../profile/validate-profile.ts';
import { configureInjection } from '../configure-injection.ts';
import { serviceSymbols } from '../service-symbols.ts';
import type { Container } from 'inversify';

configureInjection(DefaultAvailableContactSelector, [
  serviceSymbols.parseContact,
  serviceSymbols.published,
]);

configureInjection(DefaultProfileContactSelector, [
  serviceSymbols.availableContacts,
]);

configureInjection(DefaultProfileInterestSelector, [
  serviceSymbols.parseInterest,
  serviceSymbols.published,
]);

configureInjection(DefaultProfileTechnologySelector, [
  serviceSymbols.parseGroup,
  serviceSymbols.published,
]);

configureInjection(DefaultProfileValidator, [
  serviceSymbols.uniqueItems,
]);

export function bindProfile(container: Container): void {
  container
    .bind<AvailableContactSelector>(serviceSymbols.availableContacts)
    .to(DefaultAvailableContactSelector);

  container
    .bind<EnglishTextReader>(serviceSymbols.englishText)
    .to(DefaultEnglishTextReader);

  container
    .bind<ProfileContactSelector>(serviceSymbols.profileContacts)
    .to(DefaultProfileContactSelector);

  container
    .bind<ProfileInterestSelector>(serviceSymbols.profileInterests)
    .to(DefaultProfileInterestSelector);

  container
    .bind<ProfileTechnologySelector>(serviceSymbols.profileTechnologies)
    .to(DefaultProfileTechnologySelector);

  container
    .bind<PublicationPolicy>(serviceSymbols.published)
    .to(DefaultPublicationPolicy);

  container
    .bind<ProfileUrlValidator>(serviceSymbols.safeURL)
    .to(DefaultProfileUrlValidator);

  container
    .bind<ProfileIdentifierValidator>(serviceSymbols.uniqueItems)
    .to(DefaultProfileIdentifierValidator);

  container
    .bind<ProfileValidator>(serviceSymbols.validateProfile)
    .to(DefaultProfileValidator);
}
