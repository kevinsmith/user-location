'use strict';

import gulp from 'gulp';
import webpack from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import stylish from 'gulp-jscs-stylish';
import notify from 'gulp-notify';

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
    .pipe(rename('user-location.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Check JS files' adherence to coding standards
 */
gulp.task('checks', () => {
  gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});
