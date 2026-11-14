import type {
  BadgeStylesLoader,
  ProfileLoader,
} from '../../generation/generation.types.ts';
import { GitHubApiRequestAuthorizer } from '../../sources/authorize-request.ts';
import { HttpSourceDownloader } from '../../sources/download.ts';
import type { YamlLoader } from '../../sources/load/load.types.ts';
import { YamlProfileLoader } from '../../sources/load/load-profile.ts';
import { JsonBadgeStylesLoader } from '../../sources/load/load-styles.ts';
import { DefaultYamlLoader } from '../../sources/load/load-yaml.ts';
import { GitHubRepositorySourceResolver } from '../../sources/repository-source/repository-source.ts';
import type { RepositorySourceResolver } from '../../sources/repository-source/repository-source.types.ts';
import { HttpResponseTextReader } from '../../sources/response-text.ts';
import type {
  ResponseTextReader,
  SourceDownloader,
  SourceRequestAuthorizer,
} from '../../sources/sources.types.ts';
import { configureInjection } from '../configure-injection.ts';
import { serviceSymbols } from '../service-symbols.ts';
import type { Container } from 'inversify';

configureInjection(HttpSourceDownloader, [
  serviceSymbols.responseText,
  serviceSymbols.requestAuthorizer,
]);

configureInjection(YamlProfileLoader, [
  serviceSymbols.loadYaml,
  serviceSymbols.parseProfile,
  serviceSymbols.repositorySource,
]);

configureInjection(DefaultYamlLoader, [
  serviceSymbols.download,
]);

configureInjection(GitHubRepositorySourceResolver, [
  serviceSymbols.download,
]);

export function bindSources(container: Container): void {
  container
    .bind<SourceDownloader>(serviceSymbols.download)
    .to(HttpSourceDownloader);

  container
    .bind<SourceRequestAuthorizer>(serviceSymbols.requestAuthorizer)
    .toConstantValue(
      new GitHubApiRequestAuthorizer(process.env['GITHUB_TOKEN']),
    );

  container
    .bind<ProfileLoader>(serviceSymbols.loadProfile)
    .to(YamlProfileLoader);

  container
    .bind<BadgeStylesLoader>(serviceSymbols.loadStyles)
    .to(JsonBadgeStylesLoader);

  container.bind<YamlLoader>(serviceSymbols.loadYaml).to(DefaultYamlLoader);

  container
    .bind<RepositorySourceResolver>(serviceSymbols.repositorySource)
    .to(GitHubRepositorySourceResolver);

  container
    .bind<ResponseTextReader>(serviceSymbols.responseText)
    .to(HttpResponseTextReader);
}
