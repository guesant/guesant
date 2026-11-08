import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import type { SourceDownloader } from '../sources.types.ts';
import type {
  RepositorySource,
  RepositorySourceResolver,
} from './repository-source.types.ts';

export class GitHubRepositorySourceResolver
  implements RepositorySourceResolver
{
  private readonly sourceDownloader: SourceDownloader;

  constructor(sourceDownloader: SourceDownloader) {
    this.sourceDownloader = sourceDownloader;
  }

  async repositorySource(
    repository: RepositorySource['repository'],
    directory?: string,
  ): Promise<RepositorySource> {
    if (directory) {
      return {
        repository,
        directory,
        revision: 'local',
      };
    }

    const response = await this.sourceDownloader.download(
      `https://api.github.com/repos/guesant/${repository}/commits/main`,
    );

    const document: unknown = JSON.parse(response);

    const commit = record(document);

    const revision = text(commit['sha']);

    if (!/^[a-f0-9]{40}$/u.test(revision)) {
      throw new Error(`Invalid ${repository} source revision`);
    }

    return {
      repository,
      directory: undefined,
      revision,
    };
  }
}
