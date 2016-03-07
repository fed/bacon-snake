module.exports = {
  server: {
    options: {
      hostname: '*',
      port: process.env.PORT || 6789,
      base: ['.', 'src'],
      directory: 'src',
      livereload: true
    }
  }
};
