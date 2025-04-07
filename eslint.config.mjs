import { dirname, } from 'path';
import { fileURLToPath, } from 'url';
import { FlatCompat, } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import customPlugin from './rules/object-max-pairs-per-line.js';
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );
const compat = new FlatCompat( {
  baseDirectory: __dirname,
} );

/** @type {import('eslint').Linter.Config} */
const eslintConfig = [
  {
    plugins: {
      '@stylistic': stylistic,
      'custom': customPlugin,
    },
  },
  {
    ignores: [
      // '**/*.*',
      // 'eslint.config.mjs',
    ],
    // files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
  },
  ...compat.config( {
    extends: [ 'next/core-web-vitals', 'next/typescript', ],
    rules: {
      // jsx style formatting
      'space-infix-ops': [ 'error', { 'int32Hint': false, }, ],
      'arrow-spacing': [ 'error', {
        'before': true,
        'after': true,
      }, ],
      '@stylistic/semi': 'error',
      'semi-spacing': [ 'error', {
        'before': false,
        'after': false,
      }, ],
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/arrow-parens': [ 'error', 'always', ],
      '@stylistic/type-annotation-spacing': [
        'error',
        {
          'before': true,
          'after': true,
        },
      ],
      '@stylistic/indent': [ 'error', 2, ],
      '@stylistic/quotes': [ 'error', 'single', ],
      '@stylistic/jsx-quotes': [ 'error', 'prefer-double', ],
      '@stylistic/jsx-closing-bracket-location': [ 2, {
        'nonEmpty': 'tag-aligned',
        'selfClosing': 'tag-aligned',
      }, ],
      // '@stylistic/jsx-one-expression-per-line': 'error',
      // 'custom/object-max-pairs-per-line': 'error',
      '@stylistic/max-len': [ 'error', {
        code: 220,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: false,
      }, ],
      '@stylistic/jsx-curly-spacing': [
        'error',
        {
          when: 'always',
          children: true,
        },
      ],
      'react/jsx-first-prop-new-line': [ 1, 'multiline', ],
      '@stylistic/jsx-max-props-per-line': [ 'error', {
        'maximum': 1,
        'when': 'always',
      }, ],
      'react/jsx-wrap-multilines': [ 'error', {
        'declaration': 'parens',
        'assignment': 'parens',
        'return': 'parens',
        'arrow': 'parens',
        'condition': 'parens',
        'logical': 'parens',
        'prop': 'parens',
      }, ],

      // vars
      '@typescript-eslint/no-unused-vars': [ 'off', ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      // '@typescript-eslint/no-unused-vars': ['error'],
      // 'no-unused-vars': 'error',

      // arrays
      '@stylistic/array-bracket-spacing': [ 'error', 'always', ],
      '@stylistic/no-multi-spaces': [ 'error', ],
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/jsx-props-no-multi-spaces': [ 'error', ],
      '@stylistic/no-trailing-spaces': [ 'error', { 'skipBlankLines': false, }, ],
      '@stylistic/comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],

      // objects
      '@stylistic/object-curly-spacing': [ 'error', 'always', ],
      '@stylistic/object-curly-newline': [ 'error', {
        multiline: true, // Allow multiline objects
        consistent: true, // Ensure consistent behavior
      }, ],
      '@stylistic/object-property-newline': [ 'error', {
        allowAllPropertiesOnSameLine: false, // Each property on its own line
      }, ],
      '@stylistic/no-multiple-empty-lines': [ 'error', {
        max: 1, // Max 1 blank line anywhere
        maxEOF: 0, // No blank lines at end of file
      }, ],
      '@stylistic/padded-blocks': [ 'error', 'never', ],
      '@stylistic/comma-dangle': [
        'error',
        {
          arrays: 'always',
          objects: 'always',
          imports: 'always',
          exports: 'always',
          functions: 'never',
        },
      ],

      // func
      '@stylistic/space-in-parens': [ 2, 'always', ],
    },
  } ),
];
export default eslintConfig;
