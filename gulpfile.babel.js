'use strict';

import gulp from 'gulp';
import webpack from 'webpack-stream';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import jscs from 'gulp-jscs';
import jshint from 'gulp-jshint';
import notify from 'gulp-notify';

gulp.task('default', ['jscs', 'lint'], () => {
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
gulp.task('jscs', () => {
  gulp.src('src/**/*.js')
    .pipe(jscs())
    .on('error', function (err) {
      console.log('Error:', err.message);
      this.emit('end');
    })
    .pipe(notify({
      title: 'JSCS',
      message: function (file) {
        if (file.jscs.success) {
          // Don't show anything if success
          return false;
        }

        var errors = file.jscs.errors.map(function (data) {
          return "(" + data.line + ':' + data.column + ') ' + data.message;
        }).join("\n");
        return file.relative + " (" + file.jscs.errors.length + (file.jscs.errors.length > 1 ? " errors" : " error") + ")\n" + errors;
      },
      sound: 'Pop'
    }));
});


/**
 * Check JS files for errors and potential problems
 */
gulp.task('lint', () => {
  gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(notify({
      title: 'JSHint',
      message: function (file) {
        if (file.jshint.success) {
          // Don't show anything if success
          return false;
        }

        var errors = file.jshint.results.map(function (data) {
          if (data.error) {
            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
          }
        }).join("\n");
        return file.relative + " (" + file.jshint.results.length + (file.jshint.results.length > 1 ? " errors" : " error") + ")\n" + errors;
      },
      sound: 'Pop'
    }))
    .pipe(jshint.reporter('jshint-stylish'))
});
