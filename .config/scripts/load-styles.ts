import { readFile } from 'node:fs/promises';
import type { BadgeStyles } from './profile.types.ts';
import { record } from './record.ts';
import { text } from './text.ts';

export async function loadStyles(): Promise<BadgeStyles> {
  const source = await readFile('.config/badges.json', 'utf8');

  const value: unknown = JSON.parse(source);

  const styles = record(value);

  const output: BadgeStyles = {};

  for (const [
    id,
    raw,
  ] of Object.entries(styles)) {
    const style = record(raw);

    const color = text(style['color']);

    const parameters = record(style['parameters']);

    const publicParameters: Record<string, string> = {};

    for (const key of [
      'logo',
      'logoColor',
      'labelColor',
      'logoSize',
    ]) {
      if (parameters[key] !== undefined) {
        publicParameters[key] = text(parameters[key]);
      }
    }

    output[id] = {
      color,
      parameters: publicParameters,
    };
  }

  return output;
}
