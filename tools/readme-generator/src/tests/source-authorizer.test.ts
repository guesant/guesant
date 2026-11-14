import { GitHubApiRequestAuthorizer } from '../sources/authorize-request.ts';
import assert from 'node:assert/strict';
import { test } from 'vitest';

test('authorizes only GitHub API requests', (): void => {
  const authorizer = new GitHubApiRequestAuthorizer('test-token');

  const apiURL = new URL('https://api.github.com/repos/guesant/lobby');

  const apiHeaders = authorizer.headers(apiURL);

  assert.deepEqual(apiHeaders, {
    authorization: 'Bearer test-token',
  });

  const rawURL = new URL(
    'https://raw.githubusercontent.com/guesant/lobby/main/profile.yaml',
  );

  const rawHeaders = authorizer.headers(rawURL);

  assert.deepEqual(rawHeaders, {});
});
