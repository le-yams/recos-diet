// @ts-check
const eslint = require('@eslint/js');
const {defineConfig} = require('eslint/config');
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
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    },
  },
  {
    files: ['projects/web/**/*.ts'],
    rules: {
      ...selectorRules('app'),
      // NgModule-based app until the standalone and inject() migrations (step 12 of !69)
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
    },
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
