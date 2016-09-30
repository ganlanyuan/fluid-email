var config = {
  sassLang: 'libsass',
  sourcemaps: '../sourcemaps',
  server: {
    base: '.',
    hostname: '0.0.0.0',
    keepalive: true,
    stdio: 'ignore',
  },
  browserSync: {
    proxy: '0.0.0.0:8000',
    open: true,
    notify: false
  },
  libsass_options: {
    outputStyle: 'compressed', 
    precision: 7
  },
  rubysass_options: {
    style: 'compressed', 
    precision: 7,
    sourcemap: true
  },
  html: "tests/index.html",
  css: "tests/css/demo.css",
  dest: "tests/",
  inject: "inject.html",
  inline: "inline.html",
  
  // styles
  sass: {
    src: '**/scss/*.scss',
    dest: './',
  },
  
  // watch
  watch: {
    sass: '**/*.scss',
    html: 'docs/*.html'
  },
};

var gulp = require('gulp');
var php = require('gulp-connect-php');
var libsass = require('gulp-sass');
var rubysass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var modernizr = require('gulp-modernizr');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var path = require('path');
var svgmin = require('gulp-svgmin');
var svg2png = require('gulp-svg2png');
var colorize = require('gulp-colorize-svgs');
var inject = require('gulp-inject');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var mergeStream = require('merge-stream');
var inlineCss = require('gulp-inline-css');
var replace = require('gulp-replace');

function errorlog (error) {  
  console.error.bind(error);  
  this.emit('end');  
}  
function fileContents (filePath, file) {
  return file.contents.toString();
}
function fileContentsStyle(filePath, file) {
  return '<style>' + file.contents.toString() + '</style>';
}

// SASS Task
if (config.sassLang === 'libsass') {
  gulp.task('sass', function () {  
    return gulp.src(config.sass.src)  
        .pipe(sourcemaps.init())
        .pipe(libsass(config.libsass_options).on('error', libsass.logError))  
        .pipe(sourcemaps.write(config.sourcemaps))
        .pipe(rename(function (path) {
          path.dirname = path.dirname.replace("/scss", "/css");
          path.extname = ".css";
          return path;
        }))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream());
  });  
} else {
  gulp.task('sass', function () {  
    return rubysass(config.sass.src, config.rubysass_options)  
        .pipe(sourcemaps.init())
        .on('error', rubysass.logError)  
        .pipe(sourcemaps.write(config.sourcemaps))
        .pipe(rename(function (path) {
          path.dirname = path.dirname.replace("/scss", "/css");
          path.extname = ".css";
          return path;
        }))
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream());
  });  
}

gulp.task('inject', ['sass'], function() {
  return gulp.src(config.html)
    .pipe(inject(gulp.src(config.css), {
      name: 'css',
      transform: function (filePath, file) {
        return '<style>' + file.contents.toString() + '</style>';
      }
    }))
    .pipe(rename(config.inject))
    .pipe(gulp.dest(config.dest));
});

gulp.task('inline', ['sass'], function() {
  return gulp.src(config.html)
    .pipe(inlineCss({
      preserveMediaQueries: true
    }))
    .pipe(replace(/(calc\()(\S+)(\+|-|\*|\/)(\S+)(\))/g, "$1$2 $3 $4$5"))
    .pipe(rename(config.inline))
    .pipe(gulp.dest(config.dest));
});

// Server
gulp.task('server', function () {
  php.server(config.server);
});
gulp.task('sync', ['server'], function() {
  browserSync.init(config.browserSync);
});

// watch
gulp.task('watch', function () {
  gulp.watch(config.watch.sass, ['inject']);
  gulp.watch(config.watch.html).on('change', browserSync.reload);
})

// Default Task
gulp.task('default', [
  'inject',
  'sync', 
  'watch',
]);  