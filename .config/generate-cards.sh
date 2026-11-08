#!/bin/sh
set -eu

if [ -z "${PROFILE_STATS_TOKEN:-}" ]; then
  printf '%s\n' '::warning::PROFILE_STATS_TOKEN is missing; keeping the last valid cards.'
  grep -Fq 'data-testid="stars"' profile/stats.svg
  grep -Fq 'data-testid="lang-items"' profile/top-langs.svg
  exit 0
fi

export PAT_1="$PROFILE_STATS_TOKEN"
export INPUT_CORE_VERSION=''
export GITHUB_OUTPUT="${GITHUB_OUTPUT:-/dev/null}"
cards=$(mktemp -d profile/.cards.XXXXXX)
trap 'rm -f -- "$cards/stats.svg" "$cards/top-langs.svg"; rmdir "$cards"' EXIT

generate_card() {
  card=$1
  marker=$3
  export INPUT_CARD="$card"
  export INPUT_OPTIONS="username=${GITHUB_REPOSITORY_OWNER:-guesant}&$2"
  export INPUT_PATH="$cards/$card.svg"
  destination="profile/$card.svg"

  if node /opt/cards/index.js && grep -Fq "$marker" "$INPUT_PATH"; then
    mv -- "$INPUT_PATH" "$destination"
  else
    printf '::warning::Could not refresh %s; keeping the last valid card.\n' "$card"
    grep -Fq "$marker" "$destination"
  fi
}

generate_card stats 'show_icons=true&theme=holi' 'data-testid="stars"'
generate_card top-langs 'theme=holi' 'data-testid="lang-items"'
