import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { generateReadme } from './generate-readme.ts';
import { parseProfile } from './parse-profile.ts';
import { renderReadme } from './render-readme.ts';

const document = {
  version: 1,
  language: 'en',
  source: {
    url: 'https://guesant.net/profile.yaml',
    revision: 'local',
  },
  name: 'A [link](https://example.test)',
  username: 'profile',
  spoken_languages: [
    'English',
  ],
  birth_place: 'Place',
  residence: 'Place',
  birth_country: {
    name: 'Country',
    url: 'https://example.test/',
  },
  interests: [],
  contacts: [
    {
      id: 'email',
      title: 'Email',
      url: 'mailto:person@example.test',
    },
  ],
  technologies: [],
};

test('the public contract rejects unsafe URLs and duplicate identities and escapes Markdown', (): void => {
  assert.throws(() =>
    parseProfile({
      ...document,
      version: 2,
    }),
  );
  assert.throws(() =>
    parseProfile({
      ...document,
      contacts: [
        {
          id: 'bad',
          title: 'Bad',
          url: 'javascript:alert(1)',
        },
      ],
    }),
  );
  assert.throws(() =>
    parseProfile({
      ...document,
      contacts: [
        ...document.contacts,
        ...document.contacts,
      ],
    }),
  );

  const profile = parseProfile(document);

  const markdown = renderReadme(profile, {});

  assert.ok(markdown.includes('A \\[link\\]\\(https://example.test\\)'));
  assert.equal(markdown, renderReadme(profile, {}));
});

test('invalid or missing source data never replaces the last valid README', async (): Promise<void> => {
  const directory = await mkdtemp(join(tmpdir(), 'profile-'));

  const destination = join(directory, 'README.md');

  const source = join(directory, 'invalid.yaml');

  try {
    await writeFile(destination, 'Previous README');
    await writeFile(source, 'version: 99');
    await assert.rejects(generateReadme(source, destination));
    await assert.rejects(
      generateReadme(join(directory, 'missing.yaml'), destination),
    );
    assert.equal(await readFile(destination, 'utf8'), 'Previous README');
  } finally {
    await rm(directory, {
      recursive: true,
      force: true,
    });
  }
});
