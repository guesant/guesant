import type { Profile, Technology } from './profile.types.ts';
import type {
  ProfileIdentifierValidator,
  ProfileValidator,
} from './profile-operations.types.ts';

export class DefaultProfileValidator implements ProfileValidator {
  private readonly profileIdentifierValidator: ProfileIdentifierValidator;

  constructor(profileIdentifierValidator: ProfileIdentifierValidator) {
    this.profileIdentifierValidator = profileIdentifierValidator;
  }

  validateProfile(profile: Profile): Profile {
    if (
      !/^(?:[a-f0-9]{40}|local)$/u.test(profile.revisions.lobby) ||
      !/^(?:[a-f0-9]{40}|local)$/u.test(profile.revisions.resume) ||
      !/^[a-z0-9-]+$/iu.test(profile.username)
    ) {
      throw new Error('Invalid profile provenance or username');
    }

    this.profileIdentifierValidator.uniqueItems(profile.contacts);

    this.profileIdentifierValidator.uniqueItems(profile.interests);

    this.profileIdentifierValidator.uniqueItems(profile.technologies);

    const items: Technology[] = [];

    for (const group of profile.technologies) {
      items.push(...group.items);
    }

    this.profileIdentifierValidator.uniqueItems(items);

    return profile;
  }
}
