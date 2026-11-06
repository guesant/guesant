import { responseText } from './response-text.ts';

export async function download(url: string): Promise<string> {
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

  return responseText(response);
}
