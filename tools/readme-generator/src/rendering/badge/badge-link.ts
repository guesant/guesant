import type { MarkdownTextEscaper } from '../rendering.types.ts';
import type {
  BadgeImageBuilder,
  BadgeLinkBuilder,
  BadgeStyle,
} from './badge.types.ts';

export class DefaultBadgeLinkBuilder implements BadgeLinkBuilder {
  private readonly badgeImageBuilder: BadgeImageBuilder;
  private readonly markdownTextEscaper: MarkdownTextEscaper;

  constructor(
    badgeImageBuilder: BadgeImageBuilder,
    markdownTextEscaper: MarkdownTextEscaper,
  ) {
    this.badgeImageBuilder = badgeImageBuilder;
    this.markdownTextEscaper = markdownTextEscaper;
  }

  badgeLink(name: string, url: string, style?: BadgeStyle): string {
    const caption = [
      style?.label ?? '',
      name,
    ]
      .join(' ')
      .trim();

    const label = this.markdownTextEscaper.markdownText(caption);

    const image = this.badgeImageBuilder.badgeImage(name, style);

    return `[![${label}](${image})](${url})`;
  }
}
