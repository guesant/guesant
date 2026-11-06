FROM node:24.15.0-bookworm-slim@sha256:4e6b70dd6cbfc88c8157ba19aa3d9f9cce6ba4703576d55459e45efcbc9c5f5d
ADD --checksum=sha256:9128cfe26aee0c99f4fc68c15c6b8b12309a68be0de2c012cdfea2a463cb722f https://github.com/nodejs/corepack/releases/download/v0.36.0/corepack.tgz /tmp/corepack.tgz
RUN mkdir -p /opt/corepack \
  && tar -xzf /tmp/corepack.tgz -C /opt/corepack --strip-components=1 \
  && node /opt/corepack/dist/corepack.js enable pnpm --install-directory /usr/local/bin \
  && rm /tmp/corepack.tgz
ENV PNPM_CONFIG_STORE_DIR=/pnpm/store
WORKDIR /workspace
COPY .config/package.json .config/pnpm-lock.yaml .config/pnpm-workspace.yaml .config/
WORKDIR /workspace/.config
RUN pnpm install --frozen-lockfile
ENV PROFILE_CONTAINER=1
CMD ["pnpm", "run", "generate"]
