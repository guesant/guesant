import { loadYaml } from './load-yaml.ts';
import { parseProfile } from './parse-profile.ts';
import type { Profile, SourceOptions } from './profile.types.ts';
import { repositorySource } from './repository-source.ts';

export async function loadProfile(
  options: SourceOptions = {},
): Promise<Profile> {
  const lobby = await repositorySource('lobby', options.lobbyDirectory);

  const resume = await repositorySource('resume', options.resumeDirectory);

  const personal = loadYaml(lobby, 'website/src/data/profile.yaml');

  const links = loadYaml(lobby, 'website/src/data/links.yaml');

  const editorial = loadYaml(lobby, 'website/src/data/editorial.yaml');

  const technologies = loadYaml(resume, 'cv/technologies.yaml');

  const documents = await Promise.all([
    personal,
    links,
    editorial,
    technologies,
  ]);

  return parseProfile(
    {
      personal: documents[0],
      links: documents[1],
      editorial: documents[2],
      technologies: documents[3],
    },
    {
      lobby: lobby.revision,
      resume: resume.revision,
    },
  );
}
