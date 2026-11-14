import type { SourceRequestAuthorizer } from './sources.types.ts';

export class GitHubApiRequestAuthorizer implements SourceRequestAuthorizer {
  private readonly token: string | undefined;

  constructor(token: string | undefined) {
    this.token = token;
  }

  headers(url: URL): Record<string, string> {
    if (url.hostname !== 'api.github.com' || !this.token) {
      return {};
    }

    return {
      authorization: `Bearer ${this.token}`,
    };
  }
}
