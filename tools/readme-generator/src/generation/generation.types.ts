import type { Profile, SourceRevisions } from '../profile/profile.types.ts';
import type { BadgeStyles } from '../rendering/badge/badge.types.ts';

export type SourceOptions = {
  lobbyDirectory?: string | undefined;
  resumeDirectory?: string | undefined;
};

export type GenerateReadmeRequest = {
  sources: SourceOptions;
  destination: string;
};

export type ReadmeRenderer = {
  renderReadme(profile: Profile, styles: BadgeStyles): string;
};

export type ProfileLoader = {
  loadProfile(options?: SourceOptions): Promise<Profile>;
};

export type BadgeStylesLoader = {
  loadStyles(): Promise<BadgeStyles>;
};

export type ReadmeWriter = {
  writeReadme(destination: string, markdown: string): Promise<void>;
};

export type ReadmeGenerator = {
  generate(request: GenerateReadmeRequest): Promise<SourceRevisions>;
};
