module.exports = {
  server: {
    options: {
      hostname: '*',
      port: process.env.PORT || 6789,
      base: ['.', 'dist'],
      directory: 'dist',
      livereload: true
    }
  }
};
