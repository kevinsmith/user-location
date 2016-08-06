/* eslint-disable */
'use strict';

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import webpack from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import eslint from 'gulp-eslint';

gulp.task('default', ['checks'], () => {
  return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({
      preserveComments: 'license',
      compress: {
           negate_iife: false
        }
    }))
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Check JS files' adherence to coding standards
 */
gulp.task('checks', () => {
  gulp.src('src/**/*.js')
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('src')))
    .pipe(eslint.failAfterError());
});

/**
 * Has ESLint fixed the file contents?
 */
function isFixed(file) {
  return file.eslint != null && file.eslint.fixed;
}
