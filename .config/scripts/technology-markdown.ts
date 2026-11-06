import type { BadgeStyles } from './profile.types.ts';
import { badgeLink } from './badge-link.ts';
import { markdownText } from './markdown-text.ts';
import type { TechnologyGroup } from './profile.types.ts';

export function technologyMarkdown(
  groups: TechnologyGroup[],
  styles: BadgeStyles,
): string {
  const sections: string[] = [];

  for (const group of groups) {
    if (!group.items.length) {
      continue;
    }

    const title = markdownText(group.title);

    const links: string[] = [];

    for (const item of group.items) {
      const badge = badgeLink(
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
