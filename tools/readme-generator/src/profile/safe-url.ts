import { text } from '../utils/text.ts';
import type { ProfileUrlValidator } from './profile-operations.types.ts';

export class DefaultProfileUrlValidator implements ProfileUrlValidator {
  safeURL(value: unknown): string {
    const input = text(value);

    const url = new URL(input);

    if (this.invalidAuthority(url) || /[\r\n]/u.test(input)) {
      throw new Error('Invalid profile URL');
    }

    if (url.protocol === 'https:') {
      return url.href.replaceAll('(', '%28').replaceAll(')', '%29');
    }

    if (url.protocol === 'http:' && url.hostname === 'lattes.cnpq.br') {
      return url.href;
    }

    if (this.validEmailURL(url)) {
      return url.href;
    }

    throw new Error('Unsupported profile URL');
  }

  private invalidAuthority(url: URL): boolean {
    return Boolean(url.username || url.password || url.port);
  }

  private validEmailURL(url: URL): boolean {
    return (
      url.protocol === 'mailto:' &&
      /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/iu.test(url.pathname) &&
      !url.search &&
      !url.hash
    );
  }
}
