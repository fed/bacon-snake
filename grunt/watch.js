module.exports = {
  js: {
    files: [
      'Gruntfile.js',
      'grunt/{,**/}*.js',
      'src/{,**/}*.js'
    ],
    tasks: ['js'],
    options: {
      livereload: true
    }
  },
  css: {
    files: ['src/{,**/}*.css'],
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
