import type {
  ResponseTextReader,
  SourceDownloader,
  SourceRequestAuthorizer,
} from './sources.types.ts';

export class HttpSourceDownloader implements SourceDownloader {
  private readonly responseTextReader: ResponseTextReader;

  private readonly requestAuthorizer: SourceRequestAuthorizer;

  constructor(
    responseTextReader: ResponseTextReader,
    requestAuthorizer: SourceRequestAuthorizer,
  ) {
    this.responseTextReader = responseTextReader;
    this.requestAuthorizer = requestAuthorizer;
  }

  async download(url: string): Promise<string> {
    const signal = AbortSignal.timeout(15000);

    const requestURL = new URL(url);

    const authorizationHeaders = this.requestAuthorizer.headers(requestURL);

    const response = await fetch(url, {
      redirect: 'error',
      signal,
      headers: {
        accept: 'application/json, application/yaml, text/plain',
        'user-agent':
          'guesant-profile-generator/1.0 (+https://github.com/guesant/guesant)',
        ...authorizationHeaders,
      },
    });

    return this.responseTextReader.responseText(response);
  }
}
