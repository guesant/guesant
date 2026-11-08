import type { BadgeImageBuilder, BadgeStyle } from './badge.types.ts';

export class ShieldsBadgeImageBuilder implements BadgeImageBuilder {
  badgeImage(name: string, style?: BadgeStyle): string {
    const message = encodeURIComponent(name).replaceAll('-', '--');

    const color = encodeURIComponent(style?.color ?? '24292f');

    let path = `${message}-${color}`;

    if (style?.label) {
      const label = encodeURIComponent(style.label).replaceAll('-', '--');

      path = `${label}-${path}`;
    }

    const image = new URL(`https://img.shields.io/badge/${path}`);

    image.searchParams.set('style', 'for-the-badge');

    for (const [
      key,
      value,
    ] of Object.entries(style?.parameters ?? {})) {
      image.searchParams.set(key, value);
    }

    return image.href;
  }
}
