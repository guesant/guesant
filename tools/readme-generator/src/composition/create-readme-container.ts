import { bindGeneration } from './bind/bind-generation.ts';
import { bindOutput } from './bind/bind-output.ts';
import { bindProfile } from './bind/bind-profile.ts';
import { bindProfileParsers } from './bind/bind-profile-parsers.ts';
import { bindRendering } from './bind/bind-rendering.ts';
import { bindSources } from './bind/bind-sources.ts';
import { Container } from 'inversify';

export function createReadmeContainer(): Container {
  const container = new Container();

  bindProfile(container);
  bindProfileParsers(container);
  bindRendering(container);
  bindSources(container);
  bindOutput(container);
  bindGeneration(container);

  return container;
}
