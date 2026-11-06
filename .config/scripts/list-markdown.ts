import { markdownText } from './markdown-text.ts';

export function listMarkdown(values: string[]): string {
  const lines: string[] = [];

  for (const value of values) {
    const text = markdownText(value);

    lines.push(`- ${text}`);
  }

  return lines.join('\n');
}
