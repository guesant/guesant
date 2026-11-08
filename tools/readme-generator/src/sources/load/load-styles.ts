import type { BadgeStylesLoader } from '../../generation/generation.types.ts';
import type { BadgeStyles } from '../../rendering/badge/badge.types.ts';
import { record } from '../../utils/record.ts';
import { text } from '../../utils/text.ts';
import { readFile } from 'node:fs/promises';

export class JsonBadgeStylesLoader implements BadgeStylesLoader {
  async loadStyles(): Promise<BadgeStyles> {
    const stylesURL = new URL('../../../badges.json', import.meta.url);

    const source = await readFile(stylesURL, 'utf8');

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
}
