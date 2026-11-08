import type { ProfileIdentifierValidator } from './profile-operations.types.ts';

export class DefaultProfileIdentifierValidator
  implements ProfileIdentifierValidator
{
  uniqueItems(
    items: {
      id: string;
    }[],
  ): void {
    const ids = new Set<string>();

    for (const item of items) {
      if (!/^[a-z][a-z0-9-]{0,127}$/u.test(item.id) || ids.has(item.id)) {
        throw new Error('Invalid or duplicate profile identifier');
      }

      ids.add(item.id);
    }
  }
}
