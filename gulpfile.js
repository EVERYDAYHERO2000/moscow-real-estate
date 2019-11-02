const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const gap = require('gulp-append-prepend');
const watch = require('gulp-watch');
const normalizeUrl = require('normalize-url');
const babel = require('gulp-babel');


sass.compiler = require('node-sass');

const DEV_PATH = __dirname;

global.DEV_PATH = DEV_PATH;

const config = require( DEV_PATH + '/package.json');
const settings = require( DEV_PATH + '/gulp/settings.json');

global.SETTINGS = settings;

/*
data build
*/
gulp.task('data', function () {
  (require( DEV_PATH + '/gulp/build-data.js' ))();
});

/*
index.html
*/
gulp.task('html', function () {
  delete require.cache[require.resolve(DEV_PATH + '/gulp/create-main-page.js')];
  (require(DEV_PATH + '/gulp/create-main-page.js'))();
});


/*
scss -> css
*/
gulp.task('sass', function () {
  
  gulp.src(DEV_PATH + '/source/app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEV_PATH + '/bin/app/'));
    
});



/*
combine js files to main.js
*/
gulp.task('js', function () {
	
  gulp.src(DEV_PATH + '/source/app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(babel({
       presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gap.prependText('var __={core:{},fs:{}};'))
    .pipe(gap.appendText(`$(function(){runApp();console.log("${config.version}");})`))
    .pipe(replace(/\\n+/g, ''))
    .pipe(replace(/\s+/g, ' '))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEV_PATH + '/bin/app/'));
  
});

gulp.task('update-data', function () {

  (require( DEV_PATH + '/gulp/update-data.js' ))();

});

/*
npm run dev
*/
gulp.task('default',['sass','js','data','html'], function () {
    
  
    watch( DEV_PATH + '/gulp/create-main-page.js', function () {
      gulp.start('html'); 
    });
  
  
    watch( DEV_PATH + '/source/app/**/*.scss', function () {
      gulp.start('sass');
    });
  
    watch( DEV_PATH + '/source/app/**/*.js', function () {
      gulp.start('js');
    });
  
});
