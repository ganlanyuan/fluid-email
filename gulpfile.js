const gulp = require('gulp');
const packages = require('/www/package.json');
const $ = require('gulp-load-plugins')({
  config: packages
});
const browserSync = require('browser-sync').create();
const path = require('path');

var srcPath = 'demo/';
var config = {
  html: srcPath + 'index.html',
  sass: srcPath + 'scss/main.scss',
  css: srcPath + 'css/main.css',
  dest: srcPath + '',
  postfixTemp: '-temp',
  postfixOutput: '-final',
};

function errorlog (error) {  
  console.error.bind(error);  
  this.emit('end');  
}  

// Default Task
gulp.task('default', [
  // 'inject',
  // 'inline',
  // 'compile',
  'server', 
  'watch',
]);  

// watch
gulp.task('watch', function () {
  gulp.watch(config.sass, ['compile']);
  gulp.watch(config.html, ['concat']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
});

// SASS Task
gulp.task('sass', function () {  
  return gulp.src(config.sass)  
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'expanded', 
      precision: 7
    }).on('error', $.sass.logError))  
    .pipe($.rename(function (path) {
      path.extname = '.css';
      return path;
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(srcPath + 'css'))
    .pipe(browserSync.stream());
});  

function inlineStyles () {
  return gulp.src(config.html.replace('.html', config.postfixTemp + '.html'))
    .pipe($.inlineCss({
      applyLinkTags: false,
      removeLinkTags: true,
      // applyStyleTags: false,
      // removeStyleTags: false,
      preserveMediaQueries: true
    }))
    .pipe($.replace(/(calc\()(\S+)(\+|-|\*|\/)(\S+)(\))/g, '$1$2 $3 $4$5'))
    .pipe($.rename(function (path) {
      path.basename = path.basename.replace(config.postfixTemp, config.postfixOutput);
    }))
    .pipe(gulp.dest(config.dest));
}

function injectStyles () {
  return gulp.src(config.html)
    .pipe($.inject(gulp.src(config.css), {
      starttag: '/* css:css */',
      endtag: '/* endinject */',
      transform: function (filePath, file) { return file.contents.toString(); }
    }))
    .pipe($.rename(function (path) { path.basename += config.postfixTemp; }))
    .pipe(gulp.dest(config.dest));
};

gulp.task('inject', () => { injectStyles() });
gulp.task('inline', () => { inlineStyles() });
gulp.task('pre-compile', ['sass'], () => { injectStyles() });
gulp.task('compile', ['pre-compile'], () => { inlineStyles() });
gulp.task('concat', ['inject'], () => { inlineStyles() });

// Server
gulp.task('server', () => { 
  browserSync.init({
    server: { baseDir: './'},
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    },
    open: false,
    notify: false
  }); 
});