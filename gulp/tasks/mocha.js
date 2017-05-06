const gulp = require('gulp')
const cfg = require('../cfg')
const mocha = require('gulp-mocha')

gulp.task('mocha', () => {
  gulp.src(cfg.paths.mocha.test, {read: false}).pipe(mocha({
    ui: 'bdd',
    boil: true, // run every test if this pass hooks == before test
    reporter: 'nyan', // nyan spec min list markdowm tap
    require: ['source-map-support/register']
  }))
  .once('error', () => {
    process.exit(1)
  })
  .once('end', () => {
    process.exit()
  })
})
