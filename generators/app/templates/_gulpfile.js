var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var smushit = require('gulp-smushit');
var jscs = require('gulp-jscs');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
//POSTCSS FOR AUTOPREFIXER
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var rq = require('run-sequence');
var del = require('del');

//
// Collective functions (destination as .tmp or dist)
//

//BrowserSync WebServer ( dest == files directory )
function webServer(dest) {
  return browserSync.init({
    server: {
      baseDir: dest
    }
  });
}

//Create SVG sprite
function createSVG(dest) {
  return gulp.src('app/assets/svg/*.svg')
    .pipe(svgstore())
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest(dest + '/assets/svg'));
}

//Compresses images
function compressImages(dest) {
  return gulp.src('app/assets/images/*')
    .pipe(smushit())
    .pipe(gulp.dest(dest + '/assets/images'))
};

//Compile Sass, autoprefix, minify when dist
function sassCompiler(dest) {
  function compileSass() {
    return gulp.src('app/assets/sass/app.scss')
      .pipe(sass())
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
      .pipe(rename('styles.min.css'))
  }

  if(dest == '.tmp') {
    return compileSass()
      .pipe(gulp.dest(dest + '/assets/css'))
      .pipe(browserSync.stream());
  } else if (dest == 'dist') {
    return compileSass()
      .pipe(cssnano())
      .pipe(gulp.dest(dest + '/assets/css'));
  }
}

//Minifying-combining task -- js (css also possible)
function combine(dest) {
  if(dest == '.tmp') {
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream())
  } else if (dest == 'dist') {
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      //.pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest(dest))
  }
}

//Copy includes folder
function includes(dest) {
  return gulp.src('app/includes/**/*')
    .pipe(gulp.dest(dest + '/includes'))
}

//Copy fonts
function fonts(dest) {
  gulp.src('node_modules/font-awesome/fonts/*').pipe(gulp.dest(dest + '/assets/fonts'));
  gulp.src('node_modules/bootstrap-sass/assets/fonts/bootstrap/*').pipe(gulp.dest(dest + '/assets/fonts/bootstrap'));
}

//
// Development Tasks ( .tmp directory )
//

//* Project initialization
gulp.task('init', ['icons', 'images', 'fonts', 'combine', 'includes', 'sass'], function() {
  rq('serve');
});

//* Watch SASS, JS, HTML -- I keep an eye on everything
gulp.task('serve', ['server'], function() {
  gulp.watch('app/includes/**/*', ['includes']);
  gulp.watch('app/assets/sass/**/*.scss', ['sass']);
  gulp.watch('app/assets/js/**/*.js', ['jscs','combine']);
  gulp.watch('app/index.html', ['combine']);
});

//1. WebServer
gulp.task('server', function() {
  webServer('.tmp');
});

//2. SASS to CSS, Autoprefix, Move to tmp folder
gulp.task('sass', function() {
  return sassCompiler('.tmp');
});

//3. Linting js files
gulp.task('jscs', () => {
  return gulp.src('app/assets/js/*.js')
    .pipe(jscs({fix: true}))
    .pipe(gulp.dest('app/assets/js'));
});

//4. Combine js files (combining css files is also possible). Config in index.html
gulp.task('combine', function() {
  return combine('.tmp');
});

//5. Compressing images
gulp.task('imgcompress', function() {
  return compressImages('.tmp');
});

//6. Creating svg sprite
gulp.task('icons', function() {
  return createSVG(".tmp");
});

//7. Copy images to tmp
gulp.task('images', function() {
  return gulp.src('app/assets/images/**/*')
    .pipe(gulp.dest('.tmp/assets/images'))
});

//8. Copy views and partials to tmp
gulp.task('includes', function() {
  return includes('.tmp')
    .pipe(browserSync.stream());
});

//9. Copy fonts
gulp.task('fonts', function() {
  return fonts('.tmp');
});

//
// Dist Tasks ( dist directory )
//

//* Build and serve
gulp.task('dist:build', ['dist:sass', 'dist:combine', 'dist:compress', 'dist:icons', 'dist:includes', 'dist:fonts']);

//1. WebServer
gulp.task('dist:server', function() {
  webServer('dist');
});

//2. SASS to CSS, Autoprefix, cssmin, Move to dist folder
gulp.task('dist:sass', function() {
  return sassCompiler('dist');
});

//4. Combine js files, minify (combining css files is also possible)
gulp.task('dist:combine', ['dist:sass'],function() {
  return combine('dist');
});

//5. Compressing images
gulp.task('dist:compress', function() {
  return compressImages('dist');
});

//6. Creating svg sprite
gulp.task('dist:icons', function() {
  return createSVG("dist");
});

//7. Copy views and partials to dist
gulp.task('dist:includes', function() {
  return includes('dist');
});

//8. Copy fonts
gulp.task('dist:fonts', function() {
  return fonts('dist');
});

//9. Clean dist
gulp.task('dist:clean', function() {
  return del.sync('dist');
});
