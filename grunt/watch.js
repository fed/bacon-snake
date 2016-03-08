module.exports = {
  js: {
    files: [
      'Gruntfile.js',
      'grunt/{,**/}*.js',
      'src/js/{,**/}*.js'
    ],
    tasks: ['js'],
    options: {
      livereload: true
    }
  },
  css: {
    files: ['src/css/{,**/}*.css'],
    options: {
      livereload: true
    }
  },
  html: {
    files: ['src/{,**/}*.html'],
    options: {
      livereload: true
    }
  }
};
