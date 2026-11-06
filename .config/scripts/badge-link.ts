import { badgeImage } from './badge-image.ts';
import { markdownText } from './markdown-text.ts';
import type { BadgeStyle } from './profile.types.ts';

export function badgeLink(
  name: string,
  url: string,
  style?: BadgeStyle,
): string {
  const caption = [
    style?.label ?? '',
    name,
  ]
    .join(' ')
    .trim();

  const label = markdownText(caption);

  const image = badgeImage(name, style);

  return `[![${label}](${image})](${url})`;
}
