module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss'
  ],
  rules: {
    'prettier/prettier': true,
    indentation: 2,
    'declaration-empty-line-before': [
      'never',
      {
        ignore: [
          'after-declaration'
        ]
      }
    ]
  },
  ignoreFiles: [
    'node_modules/*'
  ]
}