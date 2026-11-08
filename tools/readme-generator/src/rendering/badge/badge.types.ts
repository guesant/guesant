export type BadgeStyle = {
  color: string;
  parameters: Record<string, string>;
  label?: string;
};

export type BadgeStyles = Record<string, BadgeStyle>;

export type BadgeImageBuilder = {
  badgeImage(name: string, style?: BadgeStyle): string;
};

export type BadgeLinkBuilder = {
  badgeLink(name: string, url: string, style?: BadgeStyle): string;
};
