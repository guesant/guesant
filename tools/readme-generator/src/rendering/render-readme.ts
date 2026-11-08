import type { ReadmeRenderer } from '../generation/generation.types.ts';
import type { Profile } from '../profile/profile.types.ts';
import type { BadgeLinkBuilder, BadgeStyles } from './badge/badge.types.ts';
import type { ReadmeTemplate } from './readme-template/readme-template.types.ts';
import type {
  InterestDescriptionFormatter,
  MarkdownListFormatter,
  MarkdownTextEscaper,
  SocialMarkdownRenderer,
  TechnologyMarkdownRenderer,
} from './rendering.types.ts';

export class MarkdownReadmeRenderer implements ReadmeRenderer {
  private readonly badgeLinkBuilder: BadgeLinkBuilder;
  private readonly interestDescriptionFormatter: InterestDescriptionFormatter;
  private readonly markdownListFormatter: MarkdownListFormatter;
  private readonly markdownTextEscaper: MarkdownTextEscaper;
  private readonly readmeTemplate: ReadmeTemplate;
  private readonly socialMarkdownRenderer: SocialMarkdownRenderer;
  private readonly technologyMarkdownRenderer: TechnologyMarkdownRenderer;

  constructor(
    badgeLinkBuilder: BadgeLinkBuilder,
    interestDescriptionFormatter: InterestDescriptionFormatter,
    markdownListFormatter: MarkdownListFormatter,
    markdownTextEscaper: MarkdownTextEscaper,
    readmeTemplate: ReadmeTemplate,
    socialMarkdownRenderer: SocialMarkdownRenderer,
    technologyMarkdownRenderer: TechnologyMarkdownRenderer,
  ) {
    this.badgeLinkBuilder = badgeLinkBuilder;
    this.interestDescriptionFormatter = interestDescriptionFormatter;
    this.markdownListFormatter = markdownListFormatter;
    this.markdownTextEscaper = markdownTextEscaper;
    this.readmeTemplate = readmeTemplate;
    this.socialMarkdownRenderer = socialMarkdownRenderer;
    this.technologyMarkdownRenderer = technologyMarkdownRenderer;
  }

  renderReadme(profile: Profile, styles: BadgeStyles): string {
    const name = this.markdownTextEscaper.markdownText(profile.name);

    const interestDescription =
      this.interestDescriptionFormatter.interestDescription.bind(
        this.interestDescriptionFormatter,
      );

    const interests = profile.interests.map(interestDescription);

    const languages = this.markdownListFormatter.listMarkdown(
      profile.spokenLanguages,
    );

    const hobbies = this.markdownListFormatter.listMarkdown(interests);

    const social = this.socialMarkdownRenderer.socialMarkdown(
      profile.contacts,
      styles,
    );

    const birthPlace = this.markdownTextEscaper.markdownText(
      profile.birthPlace,
    );

    const residence = this.markdownTextEscaper.markdownText(profile.residence);

    const technologies = this.technologyMarkdownRenderer.technologyMarkdown(
      profile.technologies,
      styles,
    );

    const countryStyle = styles['birth-country'];

    const birthCountryBadge = this.badgeLinkBuilder.badgeLink(
      profile.birthCountry.name,
      profile.birthCountry.url,
      {
        color: countryStyle?.color ?? 'white',
        parameters: countryStyle?.parameters ?? {},
        label: 'Born in',
      },
    );

    return this.readmeTemplate.readmeTemplate({
      name,
      languages,
      hobbies,
      social,
      birthPlace,
      residence,
      technologies,
      birthCountryBadge,
    });
  }
}
