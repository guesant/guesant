#!/usr/bin/env bash
set -euo pipefail

test -s README.md
test -s profile/stats.svg
test -s profile/top-langs.svg

git config --global --add safe.directory /workspace
test "$(git rev-parse HEAD)" = "${GITHUB_SHA:?Expected checked out profile revision}"
git add -- README.md profile/stats.svg profile/top-langs.svg
if git diff --cached --quiet; then
  exit 0
fi

git -c user.name='github-actions[bot]' \
  -c user.email='41898282+github-actions[bot]@users.noreply.github.com' \
  commit -m 'chore(profile): refresh generated profile and cards'
export GIT_CONFIG_COUNT=1
export GIT_CONFIG_KEY_0=http.https://github.com/.extraheader
auth=$(printf 'x-access-token:%s' "${GITHUB_TOKEN:?Expected GitHub token}" | base64 -w 0)
export GIT_CONFIG_VALUE_0="AUTHORIZATION: basic $auth"
git push origin HEAD:refs/heads/main
