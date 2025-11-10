// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'import': importPlugin,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Запрещаем импорт из вышележащих слоев FSD
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // shared можно импортировать отовсюду
            {
              target: './src/shared',
              from: './src',
            },
            // entities можно импортировать из features, widgets, pages, app
            {
              target: './src/entities',
              from: ['./src/entities'],
            },
            // features можно импортировать из widgets, pages, app
            {
              target: './src/features',
              from: ['./src/features', './src/entities'],
            },
            // widgets можно импортировать из pages, app
            {
              target: './src/widgets',
              from: ['./src/widgets', './src/features', './src/entities'],
            },
            // pages можно импортировать из app
            {
              target: './src/pages',
              from: ['./src/pages', './src/widgets', './src/features', './src/entities'],
            },
            // app можно импортировать только из app
            {
              target: './src/app',
              from: ['./src/app', './src/pages', './src/widgets', './src/features', './src/entities'],
            },
          ],
        },
      ],
      
      // Запрещаем абсолютные импорты внутри одного модуля
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            // Разрешаем импорты через public API (index.ts)
            '**/index',
            '**/index.ts',
            '**/index.tsx',
          ],
        },
      ],
      
      // Требуем использовать public API (index.ts)
      'import/prefer-default-export': 'off',
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
])