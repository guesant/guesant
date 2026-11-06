set shell := ["sh", "-eu", "-c"]

runner := if env("PROFILE_CONTAINER", "") == "1" { "" } else { "docker compose --file .config/compose.yaml run --rm --build generator" }

generate:
    {{ runner }} sh -eu -c 'cd /workspace/.config && pnpm run generate'

check:
    {{ runner }} sh -eu -c 'cd /workspace/.config && pnpm run check'
