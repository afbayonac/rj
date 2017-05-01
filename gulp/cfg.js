module.exports = {
  paths: {
    proyect: './',
    main: './dist/app/bin/www',
    src: './src/**/*',
    ts: {
      src: './src/**/*.ts',
      dest: './dist'
    },
    mocha: {
      test: './dist/test/**/*.js'
    }
  }
}
