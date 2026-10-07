// @ts-check
const eslint = require('@eslint/js');
const {defineConfig} = require('eslint/config');
const stylistic = require('@stylistic/eslint-plugin');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

const selectorRules = prefix => ({
  '@angular-eslint/directive-selector': ['error', {type: 'attribute', prefix, style: 'camelCase'}],
  '@angular-eslint/component-selector': ['error', {type: 'element', prefix, style: 'kebab-case'}],
});

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      // quote_type = single in .editorconfig, and the {X} style of the codebase
      '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
      '@stylistic/object-curly-spacing': ['error', 'never'],
    },
  },
  {
    files: ['projects/web/**/*.ts'],
    rules: selectorRules('app'),
  },
  {
    files: ['projects/domain/**/*.ts'],
    rules: selectorRules('domain'),
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended],
  },
  {
    files: ['projects/web/**/*.html'],
    extends: [angular.configs.templateAccessibility],
  },
]);
