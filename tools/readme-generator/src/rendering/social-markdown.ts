import type { Contact } from '../profile/profile.types.ts';
import type { BadgeLinkBuilder, BadgeStyles } from './badge/badge.types.ts';
import type { SocialMarkdownRenderer } from './rendering.types.ts';

export class DefaultSocialMarkdownRenderer implements SocialMarkdownRenderer {
  private readonly badgeLinkBuilder: BadgeLinkBuilder;

  constructor(badgeLinkBuilder: BadgeLinkBuilder) {
    this.badgeLinkBuilder = badgeLinkBuilder;
  }

  socialMarkdown(contacts: Contact[], styles: BadgeStyles): string {
    const links: string[] = [];

    for (const contact of contacts) {
      const badge = this.badgeLinkBuilder.badgeLink(
        contact.title,
        contact.url,
        styles[`contact-${contact.id}`],
      );

      links.push(badge);
    }

    return links.join('\n');
  }
}
