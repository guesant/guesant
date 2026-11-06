import type { Interest } from './profile.types.ts';

export function interestDescription(interest: Interest): string {
  return interest.description || interest.title;
}
