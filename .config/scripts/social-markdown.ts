import type { BadgeStyles } from './profile.types.ts';
import { badgeLink } from './badge-link.ts';
import type { Contact } from './profile.types.ts';

export function socialMarkdown(
  contacts: Contact[],
  styles: BadgeStyles,
): string {
  const links: string[] = [];

  for (const contact of contacts) {
    const badge = badgeLink(
      contact.title,
      contact.url,
      styles[`contact-${contact.id}`],
    );

    links.push(badge);
  }

  return links.join('\n');
}
