/** @type {import('prettier').Config} */
module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 80,
  astroSortOrder: 'markup | styles',
  astroAllowShorthand: false,
  overrides: [
    {
      files: ['webcontainers/**/*.*'],
      options: {
        printWidth: 60,
      },
    },
  ],
}
