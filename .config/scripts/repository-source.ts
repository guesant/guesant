import { download } from './download.ts';
import type { RepositorySource } from './profile.types.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export async function repositorySource(
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

  const response = await download(
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
