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
    tasks: ['css'],
    options: {
      livereload: true
    }
  },
  html: {
    files: ['src/{,**/}*.html'],
    tasks: ['html'],
    options: {
      livereload: true
    }
  }
};
