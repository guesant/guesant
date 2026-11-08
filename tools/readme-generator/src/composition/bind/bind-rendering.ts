import type { ReadmeRenderer } from '../../generation/generation.types.ts';
import type {
  BadgeImageBuilder,
  BadgeLinkBuilder,
} from '../../rendering/badge/badge.types.ts';
import { ShieldsBadgeImageBuilder } from '../../rendering/badge/badge-image.ts';
import { DefaultBadgeLinkBuilder } from '../../rendering/badge/badge-link.ts';
import { DefaultInterestDescriptionFormatter } from '../../rendering/interest-description.ts';
import { DefaultMarkdownListFormatter } from '../../rendering/list-markdown.ts';
import { DefaultMarkdownTextEscaper } from '../../rendering/markdown-text.ts';
import { DefaultReadmeTemplate } from '../../rendering/readme-template/readme-template.ts';
import type { ReadmeTemplate } from '../../rendering/readme-template/readme-template.types.ts';
import { MarkdownReadmeRenderer } from '../../rendering/render-readme.ts';
import type {
  InterestDescriptionFormatter,
  MarkdownListFormatter,
  MarkdownTextEscaper,
  SocialMarkdownRenderer,
  TechnologyMarkdownRenderer,
} from '../../rendering/rendering.types.ts';
import { DefaultSocialMarkdownRenderer } from '../../rendering/social-markdown.ts';
import { DefaultTechnologyMarkdownRenderer } from '../../rendering/technology-markdown.ts';
import { configureInjection } from '../configure-injection.ts';
import { serviceSymbols } from '../service-symbols.ts';
import type { Container } from 'inversify';

configureInjection(DefaultBadgeLinkBuilder, [
  serviceSymbols.badgeImage,
  serviceSymbols.markdownText,
]);

configureInjection(DefaultMarkdownListFormatter, [
  serviceSymbols.markdownText,
]);

configureInjection(MarkdownReadmeRenderer, [
  serviceSymbols.badgeLink,
  serviceSymbols.interestDescription,
  serviceSymbols.listMarkdown,
  serviceSymbols.markdownText,
  serviceSymbols.readmeTemplate,
  serviceSymbols.socialMarkdown,
  serviceSymbols.technologyMarkdown,
]);

configureInjection(DefaultSocialMarkdownRenderer, [
  serviceSymbols.badgeLink,
]);

configureInjection(DefaultTechnologyMarkdownRenderer, [
  serviceSymbols.badgeLink,
  serviceSymbols.markdownText,
]);

export function bindRendering(container: Container): void {
  container
    .bind<BadgeImageBuilder>(serviceSymbols.badgeImage)
    .to(ShieldsBadgeImageBuilder);

  container
    .bind<BadgeLinkBuilder>(serviceSymbols.badgeLink)
    .to(DefaultBadgeLinkBuilder);

  container
    .bind<InterestDescriptionFormatter>(serviceSymbols.interestDescription)
    .to(DefaultInterestDescriptionFormatter);

  container
    .bind<MarkdownListFormatter>(serviceSymbols.listMarkdown)
    .to(DefaultMarkdownListFormatter);

  container
    .bind<MarkdownTextEscaper>(serviceSymbols.markdownText)
    .to(DefaultMarkdownTextEscaper);

  container
    .bind<ReadmeTemplate>(serviceSymbols.readmeTemplate)
    .to(DefaultReadmeTemplate);

  container
    .bind<ReadmeRenderer>(serviceSymbols.renderReadme)
    .to(MarkdownReadmeRenderer);

  container
    .bind<SocialMarkdownRenderer>(serviceSymbols.socialMarkdown)
    .to(DefaultSocialMarkdownRenderer);

  container
    .bind<TechnologyMarkdownRenderer>(serviceSymbols.technologyMarkdown)
    .to(DefaultTechnologyMarkdownRenderer);
}
