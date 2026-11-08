import { DefaultContactParser } from '../../profile/parse/parse-contact.ts';
import { DefaultTechnologyGroupParser } from '../../profile/parse/parse-group.ts';
import { DefaultInterestParser } from '../../profile/parse/parse-interest.ts';
import { DefaultLanguageParser } from '../../profile/parse/parse-language.ts';
import { DefaultProfileParser } from '../../profile/parse/parse-profile.ts';
import { DefaultTechnologyParser } from '../../profile/parse/parse-technology.ts';
import type {
  ContactParser,
  InterestParser,
  LanguageParser,
  ProfileParser,
  TechnologyGroupParser,
  TechnologyParser,
} from '../../profile/parse/profile-parsers.types.ts';
import { configureInjection } from '../configure-injection.ts';
import { serviceSymbols } from '../service-symbols.ts';
import type { Container } from 'inversify';

configureInjection(DefaultContactParser, [
  serviceSymbols.safeURL,
]);

configureInjection(DefaultTechnologyGroupParser, [
  serviceSymbols.parseTechnology,
  serviceSymbols.published,
]);

configureInjection(DefaultLanguageParser, [
  serviceSymbols.englishText,
]);

configureInjection(DefaultProfileParser, [
  serviceSymbols.englishText,
  serviceSymbols.parseLanguage,
  serviceSymbols.profileContacts,
  serviceSymbols.profileInterests,
  serviceSymbols.profileTechnologies,
  serviceSymbols.safeURL,
  serviceSymbols.validateProfile,
]);

configureInjection(DefaultTechnologyParser, [
  serviceSymbols.safeURL,
]);

export function bindProfileParsers(container: Container): void {
  container
    .bind<ContactParser>(serviceSymbols.parseContact)
    .to(DefaultContactParser);

  container
    .bind<TechnologyGroupParser>(serviceSymbols.parseGroup)
    .to(DefaultTechnologyGroupParser);

  container
    .bind<InterestParser>(serviceSymbols.parseInterest)
    .to(DefaultInterestParser);

  container
    .bind<LanguageParser>(serviceSymbols.parseLanguage)
    .to(DefaultLanguageParser);

  container
    .bind<ProfileParser>(serviceSymbols.parseProfile)
    .to(DefaultProfileParser);

  container
    .bind<TechnologyParser>(serviceSymbols.parseTechnology)
    .to(DefaultTechnologyParser);
}
