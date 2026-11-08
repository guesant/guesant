export type RepositorySource = {
  repository: 'lobby' | 'resume';
  revision: string;
  directory: string | undefined;
};

export type RepositorySourceResolver = {
  repositorySource(
    repository: RepositorySource['repository'],
    directory?: string,
  ): Promise<RepositorySource>;
};
