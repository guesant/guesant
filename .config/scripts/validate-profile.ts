import type { Profile, Technology } from './profile.types.ts';
import { uniqueItems } from './unique-items.ts';

export function validateProfile(profile: Profile): Profile {
  if (
    !/^(?:[a-f0-9]{40}|local)$/u.test(profile.revisions.lobby) ||
    !/^(?:[a-f0-9]{40}|local)$/u.test(profile.revisions.resume) ||
    !/^[a-z0-9-]+$/iu.test(profile.username)
  ) {
    throw new Error('Invalid profile provenance or username');
  }

  uniqueItems(profile.contacts);

  uniqueItems(profile.interests);

  uniqueItems(profile.technologies);

  const items: Technology[] = [];

  for (const group of profile.technologies) {
    items.push(...group.items);
  }

  uniqueItems(items);

  return profile;
}
