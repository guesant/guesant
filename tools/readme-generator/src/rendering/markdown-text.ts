import type { MarkdownTextEscaper } from './rendering.types.ts';

export class DefaultMarkdownTextEscaper implements MarkdownTextEscaper {
  markdownText(value: string): string {
    return value
      .replaceAll(/[\\`*_{}[\]<>!#|()]/gu, '\\$&')
      .replaceAll(/[\r\n]+/gu, ' ');
  }
}
