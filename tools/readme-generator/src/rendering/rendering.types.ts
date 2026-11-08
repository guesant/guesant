import type {
  Contact,
  Interest,
  TechnologyGroup,
} from '../profile/profile.types.ts';
import type { BadgeStyles } from './badge/badge.types.ts';

export type InterestDescriptionFormatter = {
  interestDescription(interest: Interest): string;
};

export type MarkdownListFormatter = {
  listMarkdown(values: string[]): string;
};

export type MarkdownTextEscaper = {
  markdownText(value: string): string;
};

export type SocialMarkdownRenderer = {
  socialMarkdown(contacts: Contact[], styles: BadgeStyles): string;
};

export type TechnologyMarkdownRenderer = {
  technologyMarkdown(groups: TechnologyGroup[], styles: BadgeStyles): string;
};
