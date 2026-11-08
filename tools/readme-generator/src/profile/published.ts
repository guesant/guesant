import type { PublicationPolicy } from './profile-operations.types.ts';

export class DefaultPublicationPolicy implements PublicationPolicy {
  published(entry: Record<string, unknown>): boolean {
    return (
      entry['enabled'] !== false &&
      entry['public'] !== false &&
      !entry['private'] &&
      !entry['draft']
    );
  }
}
