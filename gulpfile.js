// Include gulp
var gulp = require('gulp'),
  sass = require('gulp-sass');
 
gulp.task('sass', function () {
  gulp.src('./client/styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./client/styles/'));
});

// Default Task
gulp.task('default', ['sass']);
