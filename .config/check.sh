#!/usr/bin/env bash
set -euo pipefail

mkdir -p .local/reports/sarif
status=0

run() {
  if ! "$@"; then
    status=1
  fi
}

run bash .config/check-shell.sh
run actionlint .github/workflows/*.yml
run zizmor --format sarif .github/workflows >.local/reports/sarif/zizmor.sarif
run yamllint -c .config/yamllint.yml .config .github
run ast-grep test --config .config/ast-grep/sgconfig.yml
run markdownlint-cli2 --config .config/.markdownlint-cli2.jsonc AGENTS.md 'docs/**/*.md'

for path in .github .config tools/readme-generator/src tools/readme-generator/package.json tools/readme-generator/pnpm-lock.yaml AGENTS.md README.md; do
  name=${path//\//-}
  run gitleaks dir --redact=100 --no-banner --report-format sarif --report-path ".local/reports/sarif/gitleaks-$name.sarif" "$path"
done

run ast-grep scan --config .config/ast-grep/sgconfig.yml --globs '!.config/ast-grep/tests/**' .github .config tools/readme-generator/src
run hadolint --config .config/hadolint.yaml .config/Dockerfile

if [[ ${PROFILE_CHECK_MODE:-full} == full ]]; then
  pushd tools/readme-generator
  run pnpm run format
  run pnpm run lint
  run pnpm run check
  popd
fi

run bash .config/tool-sboms.sh
run bash .config/check-osv.sh
run trivy fs --no-progress --include-dev-deps --format cyclonedx --skip-dirs tools/readme-generator/node_modules \
  --output .local/reports/sbom.cdx.json tools/readme-generator

exit "$status"
