module.exports = {
  dist: {
    options: {
      transform: [
        ['babelify', { presets: ['es2015'] }]
      ]
    },
    src: ['src/js/app.js'],
    dest: 'dist/js/bundle.js'
  }
};
