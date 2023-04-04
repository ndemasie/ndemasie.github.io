module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-logical')({ dir: 'ltr' }),
    require('postcss-preset-env'),
    require('cssnano'),
  ],
}
