import type { Interest } from '../profile/profile.types.ts';
import type { InterestDescriptionFormatter } from './rendering.types.ts';

export class DefaultInterestDescriptionFormatter
  implements InterestDescriptionFormatter
{
  interestDescription(interest: Interest): string {
    return interest.description || interest.title;
  }
}
