import type {
  MarkdownListFormatter,
  MarkdownTextEscaper,
} from './rendering.types.ts';

export class DefaultMarkdownListFormatter implements MarkdownListFormatter {
  private readonly markdownTextEscaper: MarkdownTextEscaper;

  constructor(markdownTextEscaper: MarkdownTextEscaper) {
    this.markdownTextEscaper = markdownTextEscaper;
  }

  listMarkdown(values: string[]): string {
    const lines: string[] = [];

    for (const value of values) {
      const text = this.markdownTextEscaper.markdownText(value);

      lines.push(`- ${text}`);
    }

    return lines.join('\n');
  }
}
