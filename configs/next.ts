import { FlatCompat } from '@eslint/eslintrc';
import pluginNext from '@next/eslint-plugin-next';

import eslint from '@eslint/js';
import pluginVitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as pluginCssModules from 'eslint-plugin-css-modules';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginNoRelativeImports from 'eslint-plugin-no-relative-import-paths';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImportSort from 'eslint-plugin-simple-import-sort';
import pluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import pluginSortKeys from 'eslint-plugin-sort-keys';
import pluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import globals from 'globals';
import tseslint, { parser } from 'typescript-eslint';

import { configBase } from './base';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

export const configNext = tseslint.config(
  {
    ignores: [
      '**/generated/**',
      'package.json',
      '.github',
      'storybook-static',
      '.next',
      '**/*.module.scss.d.ts',
      '!.storybook/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.all,
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- no types
  pluginImport.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@next/next': pluginNext,
      'css-modules': pluginCssModules,
      'jsx-a11y': pluginJsxA11y,
      'no-relative-import-paths': pluginNoRelativeImports,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'simple-import-sort': pluginImportSort,
      'sort-destructure-keys': pluginSortDestructureKeys,
      'sort-keys': pluginSortKeys,
      'typescript-sort-keys': pluginTypescriptSortKeys,
      vitest: pluginVitest,
    },
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          // only check prefix for type that doesn't end with certain words
          filter: {
            match: false,
            regex: '(Props|Params|Return)$',
          },
          format: ['PascalCase'],
          prefix: ['I', 'T'],
          selector: 'typeLike',
        },
        {
          // match suffix Props or Params and doesn't come right after I, T or IClass
          custom: {
            match: true,
            regex: '(?<!(I|T|IClass)([A-Z].)*)(Props|Params|Return)$',
          },
          format: ['PascalCase'],
          selector: 'typeLike',
        },
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreIIFE: true,
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-shadow': ['error'],
      /**
       * Report all unnecessary chaining "?".
       * @description https://github.com/typescript-eslint/typescript-eslint/issues/1641 (Issue description)
       * @info https://typescript-eslint.io/rules/no-unnecessary-condition/ (Eslint rule detail)
       * */
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      /** @link https://eslint.org/docs/latest/rules/no-unused-vars#ignorerestsiblings */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          typedefs: false,
        }, // disable for typing definition
      ],
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/unbound-method': 'warn',
      'arrow-body-style': ['error', 'as-needed'],
      camelcase: 'off',
      // disable since sometime `this` doesn't need to be used in some util function in class
      'class-methods-use-this': 'off',
      'css-modules/no-undef-class': ['error', { camelCase: true }],
      'css-modules/no-unused-class': ['warn', { camelCase: true }],
      'import/extensions': 'off',
      // False positives
      'import/named': 'off',
      'import/newline-after-import': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'import/no-internal-modules': [
        'warn',
        {
          forbid: [
            /* Forbids every index file in in all sub folders under folder other than `types`|`utils`|`pages` */
            '**/src/!(types|utils|pages)*/**/index.ts*',
            /* Forbids every index file in in folders other than `types`|`utils`|`pages` */
            '**/src/!(types|utils|pages)*/index.ts*',
            /* Forbids access to index.ts in all folders in `utils` but not in subfolder `api` */
            '**/src/utils/!(api)*/**/index.ts*',
            '@zonos/amino/components/select/**',
            '@zonos/amino/utils/hooks/useStorage',
            '@zonos/amino/utils/storage',
            '@zonos/amino/components/country-multi-select/CountryMultiSelectExpanded',
            '@zonos/amino/components/cover-sheet/CoverSheet',
            '@zonos/amino/components/connection-map/**',
            '@zonos/amino/components/tooltip/**',
            '@zonos/amino/components/filter/**/!(*Reducer)',
            'react-json-view',
            'react-markdown',
            'turndown',
            /* Only access lodash subfolders for tree shaking */
            'lodash',
            'lodash!(/)',
          ],
        },
      ],
      'import/no-unresolved': 'off',
      // Typescript takes care of this
      'import/prefer-default-export': 'off',
      // For debugging ease
      'no-console': 'warn',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        // Allow to import from same folder for importing scss modules
        { allowSameFolder: true },
      ],
      'no-restricted-exports': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              importNames: ['useOrganization'],
              message:
                'Direct use of useOrganization in Clerk is restricted. Use useOrganization from the project instead.',
              name: '@clerk/nextjs',
            },
            {
              importNames: ['useNotify'],
              message:
                'Direct use of useNotify from Amino is restricted. Use useNotify from the project instead.',
              name: '@zonos/amino/utils/hooks/useNotify',
            },
          ],
        },
      ],
      // https://eslint.org/docs/latest/rules/no-restricted-syntax
      'no-restricted-syntax': [
        'error',
        {
          message: 'Use `jsonParse` function instead of `JSON.parse`',
          selector:
            'MemberExpression[object.name="JSON"][property.name="parse"]',
        },
        // https://stackoverflow.com/questions/42226436/how-can-i-turn-off-eslints-no-restricted-syntax-rule-just-for-forofstatement
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      // https://github.com/typescript-eslint/typescript-eslint/issues/2483
      'no-shadow': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'error',
      'no-void': ['error', { allowAsStatement: true }],
      'prettier/prettier': 'error',
      'react/display-name': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: ['function-declaration', 'arrow-function'],
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/hook-use-state': 'off',
      // Prettier takes care of this
      'react/jsx-curly-newline': 'off',
      // Prettier takes care of this
      'react/jsx-filename-extension': 'off',
      // Prettier takes care of this
      'react/jsx-indent': 'off',
      'react/jsx-no-bind': [
        'error',
        {
          ignoreDOMComponents: true,
          // "ignoreRefs": <boolean> || false,
          // "allowArrowFunctions": <boolean> || false,
          // "allowFunctions": <boolean> || false,
          // "allowBind": <boolean> || false
        },
      ],
      'react/jsx-no-useless-fragment': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      // Prettier takes care of this
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          reservedFirst: true,
        },
      ],
      // Prettier takes care of this
      'react/jsx-wrap-multilines': 'off',
      'react/prefer-read-only-props': 'off',
      // Prettier takes care of this
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            /** Framework */
            ['^react', '^@?next'],
            /** Match all directories starting with `@` but not `@zonos`, and any path that does not start with `src/` (internal paths typically start with `src/`) */
            ['^(?!@zonos|src)'],
            /** External internal library */
            ['^@zonos'],
            /** Internal library */
            ['^src/'],
            /** Relative imports (e.g., './', '../') */
            ['^(\\.+/)'],
            /** Style imports */
            ['^.+\\.module.scss$'],
          ],
        },
      ],
      /**
       * Sort object destructure keys. This rule autofix doesn't tie with comment like `sort-keys`
       * @ref https://github.com/mthadley/eslint-plugin-sort-destructure-keys
       */
      'sort-destructure-keys/sort-destructure-keys': [
        'warn',
        { caseSensitive: false },
      ],
      'sort-keys': 'off',
      /**
       * Sort object keys (not included destructure object)
       * @ref https://github.com/namnm/eslint-plugin-sort-keys
       */
      'sort-keys/sort-keys-fix': ['warn', 'asc'],
      'storybook/use-storybook-expect': 'off',
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    /**
     * GQL operation definitions don't need to be used.
     */
    files: ['**/*.graphql.*.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-expressions': 'off',
    },
  },
  {
    /**
     * Turn off sort-keys for generated files (it will take longer to sort and there is no need to sort the generated files)
     */
    files: ['**/generated/**/*.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'sort-destructure-keys/sort-destructure-keys': 'off',
      'sort-keys': 'off',
      'sort-keys/sort-keys-fix': 'off',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react/jsx-props-no-spreading': 'off',
    },
  },
  {
    files: ['test-utils/**'],
    rules: {
      'import/no-internal-modules': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
  {
    files: ['.storybook/**'],
    rules: {
      'no-relative-import-paths/no-relative-import-paths': 'off',
    },
  },
  {
    files: ['**/*.script.ts'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],
      'vitest/expect-expect': 'off',
    },
  },
  {
    files: ['**/zonos-legacy-apis/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['src/components/ui/dynamic/**', '.storybook/**'],
    rules: {
      'import/no-internal-modules': 'off',
    },
  },
);
