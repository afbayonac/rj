const cfg = require('../cfg')
const gulp = require('gulp')
const gulpNodemon = require('gulp-nodemon')

gulp.task('nodemon', ['ts'], () => {
  gulpNodemon({
    script: cfg.paths.main,
    tasks: ['ts'],
    ext: 'ts',
    watch: [cfg.paths.src],
    // guard
    // para no alterar el entorno de prodicion con test
    env: {'NODE_ENV': process.env.NODE_ENV !== 'production'
          ? process.env.NODE_ENV || 'development' : 'development'}
  })
  .on('start', ['mocha'])
})
