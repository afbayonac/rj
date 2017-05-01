const gulp = require('gulp')
const cfg = require('../cfg')
const ts = require('gulp-typescript')

const tsProyect = ts.createProject('tsconfig.json')

gulp.task('ts', () => {
  const tsResult = tsProyect.src().pipe(tsProyect())
  return tsResult.js.pipe(gulp.dest(cfg.paths.ts.dest))
})
