import { text } from './text.ts';

export function safeURL(value: unknown): string {
  const input = text(value);

  const url = new URL(input);

  if (url.username || url.password || url.port || /[\r\n]/u.test(input)) {
    throw new Error('Invalid profile URL');
  }

  if (url.protocol === 'https:') {
    return url.href.replaceAll('(', '%28')
.replaceAll(')', '%29');
  }

  if (url.protocol === 'http:' && url.hostname === 'lattes.cnpq.br') {
    return url.href;
  }

  if (
    url.protocol === 'mailto:' &&
    /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/iu.test(url.pathname) &&
    !url.search &&
    !url.hash
  ) {
    return url.href;
  }

  throw new Error('Unsupported profile URL');
}
