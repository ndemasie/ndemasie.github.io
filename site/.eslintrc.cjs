module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  // parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  ignorePatterns: ['.*'],
  rules: {
    'import/no-unresolved': 'off', // Disable temporarily
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
        pathGroups: [
          { pattern: 'src/**', group: 'internal', position: 'before' },
        ],
      },
    ],

    // Typescript eslint rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
}
