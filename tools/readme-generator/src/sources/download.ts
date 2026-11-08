import type { ResponseTextReader, SourceDownloader } from './sources.types.ts';

export class HttpSourceDownloader implements SourceDownloader {
  private readonly responseTextReader: ResponseTextReader;

  constructor(responseTextReader: ResponseTextReader) {
    this.responseTextReader = responseTextReader;
  }

  async download(url: string): Promise<string> {
    const signal = AbortSignal.timeout(15000);

    const response = await fetch(url, {
      redirect: 'error',
      signal,
      headers: {
        accept: 'application/json, application/yaml, text/plain',
        'user-agent':
          'guesant-profile-generator/1.0 (+https://github.com/guesant/guesant)',
      },
    });

    return this.responseTextReader.responseText(response);
  }
}
