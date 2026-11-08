import type {
  ReadmeTemplate,
  ReadmeTemplateInput,
} from './readme-template.types.ts';

export class DefaultReadmeTemplate implements ReadmeTemplate {
  readmeTemplate(content: ReadmeTemplateInput): string {
    return `# Hello, my name is ${content.name} 👋

![GitHub stats](./profile/stats.svg)

Spoken Languages

${content.languages}

Hobbies

${content.hobbies}

Social

${content.social}

Born in ${content.birthPlace}.

Currently living in ${content.residence}.

## Tech Skills

${content.technologies}

---

![Top Languages](./profile/top-langs.svg)

${content.birthCountryBadge}

[Lobby](https://guesant.net/en/) · [Profile Data](https://github.com/guesant/lobby/tree/main/website/src/data) · [Technologies](https://github.com/guesant/resume/blob/main/cv/technologies.yaml)
`;
  }
}
