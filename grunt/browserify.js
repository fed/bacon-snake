module.exports = {
  dist: {
    options: {
      transform: [
        ['babelify', { presets: ['es2015', 'react'] }]
      ]
    },
    src: ['src/js/app.js'],
    dest: 'dist/js/bundle.js'
  }
};
