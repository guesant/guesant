import type { BadgeStyles } from './profile.types.ts';
import { badgeLink } from './badge-link.ts';
import { interestDescription } from './interest-description.ts';
import { listMarkdown } from './list-markdown.ts';
import { markdownText } from './markdown-text.ts';
import type { Profile } from './profile.types.ts';
import { socialMarkdown } from './social-markdown.ts';
import { technologyMarkdown } from './technology-markdown.ts';

export function renderReadme(profile: Profile, styles: BadgeStyles): string {
  const name = markdownText(profile.name);

  const interests = profile.interests.map(interestDescription);

  const languages = listMarkdown(profile.spokenLanguages);

  const hobbies = listMarkdown(interests);

  const social = socialMarkdown(profile.contacts, styles);

  const birthPlace = markdownText(profile.birthPlace);

  const residence = markdownText(profile.residence);

  const technologies = technologyMarkdown(profile.technologies, styles);

  const countryStyle = styles['birth-country'];

  const born = badgeLink(profile.birthCountry.name, profile.birthCountry.url, {
    color: countryStyle?.color ?? 'white',
    parameters: countryStyle?.parameters ?? {},
    label: 'Born in',
  });

  return `# Hello, my name is ${name} 👋\n\n![GitHub stats](./profile/stats.svg)\n\nSpoken Languages\n\n${languages}\n\nHobbies\n\n${hobbies}\n\nSocial\n\n${social}\n\nBorn in ${birthPlace}.\n\nCurrently living in ${residence}.\n\n## Tech Skills\n\n${technologies}\n\n---\n\n![Top Languages](./profile/top-langs.svg)\n\n${born}\n\n[Lobby](https://guesant.net/en/) · [Profile Data](https://guesant.net/profile.yaml)\n`;
}
