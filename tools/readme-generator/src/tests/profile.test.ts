import { createReadmeContainer } from '../composition/create-readme-container.ts';
import { serviceSymbols } from '../composition/service-symbols.ts';
import type {
  ReadmeGenerator,
  ReadmeRenderer,
} from '../generation/generation.types.ts';
import type { ProfileParser } from '../profile/parse/profile-parsers.types.ts';
import * as fc from 'fast-check';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'vitest';
import { stringify } from 'yaml';

const documents = {
  personal: {
    version: 1,
    full_name: 'A [link](https://example.test)',
    spoken_languages: [
      {
        labels: {
          en: 'English',
        },
      },
    ],
    birth_place: {
      en: 'Place',
    },
    residence: {
      en: 'Place',
    },
    birth_country: {
      labels: {
        en: 'Country',
      },
      url: 'https://example.test/',
    },
    contact_links: [
      'email',
      'hidden-contact',
      'private-section',
    ],
  },
  links: {
    profile: {
      username: 'profile',
      birth_date: 'not exported',
    },
    sections: [
      {
        links: [
          {
            id: 'email',
            labels: {
              en: {
                title: 'Email',
              },
            },
            url: 'https://example.test/',
            localized_urls: {
              en: 'mailto:person@example.test',
            },
          },
          {
            id: 'hidden-contact',
            enabled: false,
          },
        ],
      },
      {
        private: true,
        links: [
          {
            id: 'private-section',
          },
        ],
      },
    ],
  },
  editorial: {
    entries: {
      interests: [
        {
          id: 'interest',
          labels: {
            en: {
              title: 'Public Interest',
              description: 'Public',
            },
          },
        },
        {
          private: true,
        },
        {
          draft: true,
        },
        {
          public: false,
        },
        {
          enabled: false,
        },
        {
          id: 'other-language',
          labels: {
            'pt-br': {
              title: 'Outro',
            },
          },
        },
      ],
    },
  },
  technologies: {
    version: 1,
    groups: [
      {
        id: 'tools',
        labels: {
          en: 'Tools',
        },
        items: [
          {
            id: 'git',
            name: 'Git',
            url: 'https://git-scm.com/',
          },
          {
            private: true,
          },
        ],
      },
      {
        private: true,
      },
    ],
  },
};

const revisions = {
  lobby: 'local',
  resume: 'local',
};

test('direct source data respects publication filters and rejects unsafe or ambiguous data', (): void => {
  const container = createReadmeContainer();

  const parser = container.get<ProfileParser>(serviceSymbols.parseProfile);

  const renderer = container.get<ReadmeRenderer>(serviceSymbols.renderReadme);

  const profile = parser.parseProfile(documents, revisions);

  assert.deepEqual(profile.contacts, [
    {
      id: 'email',
      title: 'Email',
      url: 'mailto:person@example.test',
    },
  ]);
  assert.equal(profile.interests.length, 1);
  assert.equal(profile.technologies.length, 1);
  assert.equal(profile.technologies[0]?.items.length, 1);
  assert.equal('birth_date' in profile, false);
  assert.deepEqual(profile.revisions, revisions);

  const markdown = renderer.renderReadme(profile, {});

  assert.ok(markdown.includes('A \\[link\\]\\(https://example.test\\)'));
  assert.equal(markdown, renderer.renderReadme(profile, {}));

  const unsafe = {
    ...documents,
    links: {
      ...documents.links,
      sections: [
        {
          links: [
            {
              id: 'email',
              labels: {
                en: {
                  title: 'Email',
                },
              },
              url: 'javascript:alert(1)',
            },
          ],
        },
      ],
    },
  };

  assert.throws(() => parser.parseProfile(unsafe, revisions), /URL/);

  const duplicate = structuredClone(documents);

  duplicate.personal.contact_links.push('email');
  assert.throws(() => parser.parseProfile(duplicate, revisions), /duplicate/);

  const duplicateTechnology = structuredClone(documents);

  const items = duplicateTechnology.technologies.groups[0]?.items;

  assert.ok(items);

  items.push({
    id: 'git',
    name: 'Git',
    url: 'https://git-scm.com/',
  });
  assert.throws(
    () => parser.parseProfile(duplicateTechnology, revisions),
    /duplicate/,
  );
});

test('invalid, aliased or missing local sources never replace the last valid README', async (): Promise<void> => {
  const directory = await mkdtemp(join(tmpdir(), 'profile-'));

  const destination = join(directory, 'README.md');

  const lobby = join(directory, 'lobby');

  const resume = join(directory, 'resume');

  const data = join(lobby, 'website/src/data');

  const cv = join(resume, 'cv');

  const container = createReadmeContainer();

  const generator = container.get<ReadmeGenerator>(
    serviceSymbols.readmeGenerator,
  );

  const request = {
    sources: {
      lobbyDirectory: lobby,
      resumeDirectory: resume,
    },
    destination,
  };

  try {
    await mkdir(data, {
      recursive: true,
    });
    await mkdir(cv, {
      recursive: true,
    });
    await writeFile(destination, 'Previous README');
    await writeFile(join(data, 'profile.yaml'), stringify(documents.personal));
    await writeFile(join(data, 'links.yaml'), stringify(documents.links));
    await writeFile(
      join(data, 'editorial.yaml'),
      stringify(documents.editorial),
    );
    await writeFile(join(cv, 'technologies.yaml'), 'version: 99');
    await assert.rejects(generator.generate(request));
    assert.equal(await readFile(destination, 'utf8'), 'Previous README');

    await writeFile(
      join(cv, 'technologies.yaml'),
      stringify(documents.technologies),
    );

    const loadedRevisions = await generator.generate(request);

    assert.deepEqual(loadedRevisions, revisions);

    const valid = await readFile(destination, 'utf8');

    await generator.generate(request);
    assert.equal(await readFile(destination, 'utf8'), valid);
    await writeFile(
      join(cv, 'technologies.yaml'),
      'version: 1\ngroups: &groups []\ncopy: *groups\n',
    );
    await assert.rejects(generator.generate(request));
    assert.equal(await readFile(destination, 'utf8'), valid);
    await rm(join(cv, 'technologies.yaml'));
    await assert.rejects(generator.generate(request));
    assert.equal(await readFile(destination, 'utf8'), valid);
  } finally {
    await rm(directory, {
      recursive: true,
      force: true,
    });
  }
});

test('hidden contacts and unsafe destination schemes never reach the README', (): void => {
  const container = createReadmeContainer();
  const parser = container.get<ProfileParser>(serviceSymbols.parseProfile);
  const renderer = container.get<ReadmeRenderer>(serviceSymbols.renderReadme);

  fc.assert(
    fc.property(
      fc.stringMatching(/^[a-z]{3,24}$/u),
      fc.constantFrom('javascript', 'data', 'file', 'ftp'),
      (id, scheme): void => {
        const source = structuredClone(documents);
        const contact = source.links.sections[0]?.links[0];

        if (!contact) {
          throw new Error('Contact fixture is missing');
        }

        const url = `${scheme}:profile.example.test`;
        source.personal.contact_links = [
          id,
        ];

        const withContact = {
          ...source,
          links: {
            ...source.links,
            sections: [
              {
                links: [
                  {
                    ...contact,
                    id,
                    enabled: false,
                    localized_urls: {
                      en: url,
                    },
                  },
                ],
              },
            ],
          },
        };

        const profile = parser.parseProfile(withContact, revisions);
        assert.equal(profile.contacts.length, 0);
        assert.equal(renderer.renderReadme(profile, {}).includes(url), false);

        const section = withContact.links.sections[0];
        const candidate = section?.links[0];

        if (!candidate) {
          throw new Error('Generated contact fixture is missing');
        }

        candidate.enabled = true;
        assert.throws(() => parser.parseProfile(withContact, revisions), /URL/);
      },
    ),
    {
      numRuns: 100,
    },
  );
});
