import type { SourceRevisions } from '../profile/profile.types.ts';
import type {
  BadgeStylesLoader,
  GenerateReadmeRequest,
  ProfileLoader,
  ReadmeGenerator,
  ReadmeRenderer,
  ReadmeWriter,
} from './generation.types.ts';

export class DefaultReadmeGenerator implements ReadmeGenerator {
  private readonly profileLoader: ProfileLoader;
  private readonly badgeStylesLoader: BadgeStylesLoader;
  private readonly readmeRenderer: ReadmeRenderer;
  private readonly readmeWriter: ReadmeWriter;

  constructor(
    profileLoader: ProfileLoader,
    badgeStylesLoader: BadgeStylesLoader,
    readmeRenderer: ReadmeRenderer,
    readmeWriter: ReadmeWriter,
  ) {
    this.profileLoader = profileLoader;
    this.badgeStylesLoader = badgeStylesLoader;
    this.readmeRenderer = readmeRenderer;
    this.readmeWriter = readmeWriter;
  }

  async generate(request: GenerateReadmeRequest): Promise<SourceRevisions> {
    const profile = await this.profileLoader.loadProfile(request.sources);

    const styles = await this.badgeStylesLoader.loadStyles();

    const markdown = this.readmeRenderer.renderReadme(profile, styles);

    await this.readmeWriter.writeReadme(request.destination, markdown);

    return profile.revisions;
  }
}
