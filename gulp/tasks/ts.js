const gulp = require('gulp')
const cfg = require('../cfg')
const ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')

const tsProyect = ts.createProject('tsconfig.json')

gulp.task('ts', () => {
  const tsResult = tsProyect
  .src()
  .pipe(sourcemaps.init())
  .pipe(tsProyect())

  return tsResult.js
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(cfg.paths.ts.dest))
})
