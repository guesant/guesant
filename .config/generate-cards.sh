#!/bin/sh
set -eu

export PAT_1="${GITHUB_TOKEN:?Set GITHUB_TOKEN}"
export INPUT_CORE_VERSION=''
export GITHUB_OUTPUT="${GITHUB_OUTPUT:-/dev/null}"
export INPUT_CARD=stats
export INPUT_OPTIONS="username=${GITHUB_REPOSITORY_OWNER:-guesant}&show_icons=true&theme=holi"
export INPUT_PATH=profile/stats.svg
node /opt/cards/index.js

export INPUT_CARD=top-langs
export INPUT_OPTIONS="username=${GITHUB_REPOSITORY_OWNER:-guesant}&theme=holi"
export INPUT_PATH=profile/top-langs.svg
node /opt/cards/index.js
