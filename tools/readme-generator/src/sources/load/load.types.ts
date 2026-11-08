import type { RepositorySource } from '../repository-source/repository-source.types.ts';

export type YamlLoader = {
  loadYaml(source: RepositorySource, path: string): Promise<unknown>;
};
