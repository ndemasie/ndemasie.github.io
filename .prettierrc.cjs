module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
  astroSortOrder: 'markup | styles',
  astroAllowShorthand: false,
  overrides: [
    {
      files: ['**/apps/**/public/**/*.tsx'],
      options: {
        printWidth: 60,
      },
    },
  ],
}
