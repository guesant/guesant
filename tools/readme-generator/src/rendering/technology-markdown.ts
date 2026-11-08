import type { TechnologyGroup } from '../profile/profile.types.ts';
import type { BadgeLinkBuilder, BadgeStyles } from './badge/badge.types.ts';
import type {
  MarkdownTextEscaper,
  TechnologyMarkdownRenderer,
} from './rendering.types.ts';

export class DefaultTechnologyMarkdownRenderer
  implements TechnologyMarkdownRenderer
{
  private readonly badgeLinkBuilder: BadgeLinkBuilder;
  private readonly markdownTextEscaper: MarkdownTextEscaper;

  constructor(
    badgeLinkBuilder: BadgeLinkBuilder,
    markdownTextEscaper: MarkdownTextEscaper,
  ) {
    this.badgeLinkBuilder = badgeLinkBuilder;
    this.markdownTextEscaper = markdownTextEscaper;
  }

  technologyMarkdown(groups: TechnologyGroup[], styles: BadgeStyles): string {
    const sections: string[] = [];

    for (const group of groups) {
      if (!group.items.length) {
        continue;
      }

      const title = this.markdownTextEscaper.markdownText(group.title);

      const links: string[] = [];

      for (const item of group.items) {
        const badge = this.badgeLinkBuilder.badgeLink(
          item.name,
          item.url,
          styles[`technology-${item.id}`],
        );

        links.push(badge);
      }

      const badges = links.join('\n');

      sections.push(`### ${title}\n\n${badges}`);
    }

    return sections.join('\n\n');
  }
}
