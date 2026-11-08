set shell := ["sh", "-eu", "-c"]

generate:
    cd tools/readme-generator && pnpm run generate

check:
    bash .config/check.sh
