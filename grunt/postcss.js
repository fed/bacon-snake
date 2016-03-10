module.exports = {
  options: {
    processors: [
      require('postcss-import')(),
      require('postcss-simple-vars')(),
      require('postcss-nested')(),
      require('autoprefixer')({ browsers: 'last 2 versions' }),
      require('cssnano')()
    ]
  },
  dist: {
    src: 'src/css/app.css',
    dest: 'dist/css/app.min.css'
  }
};
