import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import { multilineStructures } from './eslint-rules/layout.ts';
import oneFunctionPerFile from './eslint-rules/one-function-per-file.ts';
import typesOnly from './eslint-rules/types-only.ts';

export default defineConfig([
  { ignores: ['node_modules/**'] },
  {
    files: ['src/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      profile: {
        rules: {
          'multiline-structures': multilineStructures,
          ...oneFunctionPerFile.rules,
          'types-only': typesOnly,
        },
      },
      'simple-import-sort': importSort,
      sonarjs,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
      '@typescript-eslint/no-misused-promises': 'error',
      'simple-import-sort/imports': ['error', { groups: [['^']] }],
      'simple-import-sort/exports': 'error',
      'profile/multiline-structures': 'error',
      'profile/types-only': 'error',
      'profile/one-function-per-file': 'error',
      'profile/one-class-per-file': 'error',
      'sonarjs/cognitive-complexity': ['error', 10],
      complexity: ['error', 8],
      curly: ['error', 'all'],
      'max-depth': ['error', 3],
      'no-ternary': 'error',
    },
  },
  {
    files: ['src/tests/**/*.test.ts'],
    rules: {
      'profile/types-only': 'off',
      'profile/one-function-per-file': 'off',
      'profile/one-class-per-file': 'off',
    },
  },
]);
