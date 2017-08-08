'use strict';

const gulp = require('gulp'),
//      sass = require('gulp-sass'),
//      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create(),
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      cmq = require('crlab-gulp-combine-media-queries'),
      cssmin = require('gulp-cssmin'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      replace = require('gulp-replace'),
      debug = require('gulp-debug'),
      del = require('del');

//gulp.task('sass', function() {   
//   return gulp.src('sass/**/*.*')
//   .pipe(debug({title: 'src'}))
//   .pipe(sourcemaps.init())
//   .pipe(sass())
//   .pipe(debug({title: 'sass'}))
//   .pipe(sourcemaps.write())
//   .pipe(gulp.dest('dev/css'));   
//    });

gulp.task ('server', function() {
    browserSync.init( {
        server: './dev/'
    });
    browserSync.watch('dev/css/**/**/*.*').on('change', browserSync.reload);
});


gulp.task('clean', function() {
    return del('build');
});

gulp.task('fonts', function() {
    return gulp.src('dev/font/**/*.*')
    .pipe(gulp.dest('build/font'));
});

gulp.task('img', function() {
    return gulp.src('dev/img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('style', function(){
    return gulp.src('./dev/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cmq({
      log: true
    }))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
          }))
    .pipe(replace(/\.\.\/\.\.\/img/g, 'img'))
    .pipe(replace(/\.\.\/font/g, 'font'))
    .pipe(gulp.dest('build/css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css'))
   
});


gulp.task('html', function() {
    return gulp.src('dev/*.html')
           .pipe(gulp.dest('build/'));
})

gulp.task('build', gulp.series('clean', gulp.parallel('fonts', 'img', 'style', 'html')  ) );