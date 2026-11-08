import type {
  ProfileLoader,
  SourceOptions,
} from '../../generation/generation.types.ts';
import type { ProfileParser } from '../../profile/parse/profile-parsers.types.ts';
import type { Profile } from '../../profile/profile.types.ts';
import type { RepositorySourceResolver } from '../repository-source/repository-source.types.ts';
import type { YamlLoader } from './load.types.ts';

export class YamlProfileLoader implements ProfileLoader {
  private readonly yamlLoader: YamlLoader;
  private readonly profileParser: ProfileParser;
  private readonly repositorySourceResolver: RepositorySourceResolver;

  constructor(
    yamlLoader: YamlLoader,
    profileParser: ProfileParser,
    repositorySourceResolver: RepositorySourceResolver,
  ) {
    this.yamlLoader = yamlLoader;
    this.profileParser = profileParser;
    this.repositorySourceResolver = repositorySourceResolver;
  }

  async loadProfile(options: SourceOptions = {}): Promise<Profile> {
    const lobby = await this.repositorySourceResolver.repositorySource(
      'lobby',
      options.lobbyDirectory,
    );

    const resume = await this.repositorySourceResolver.repositorySource(
      'resume',
      options.resumeDirectory,
    );

    const personal = this.yamlLoader.loadYaml(
      lobby,
      'website/src/data/profile.yaml',
    );

    const links = this.yamlLoader.loadYaml(
      lobby,
      'website/src/data/links.yaml',
    );

    const editorial = this.yamlLoader.loadYaml(
      lobby,
      'website/src/data/editorial.yaml',
    );

    const technologies = this.yamlLoader.loadYaml(
      resume,
      'cv/technologies.yaml',
    );

    const documents = await Promise.all([
      personal,
      links,
      editorial,
      technologies,
    ]);

    return this.profileParser.parseProfile(
      {
        personal: documents[0],
        links: documents[1],
        editorial: documents[2],
        technologies: documents[3],
      },
      {
        lobby: lobby.revision,
        resume: resume.revision,
      },
    );
  }
}
