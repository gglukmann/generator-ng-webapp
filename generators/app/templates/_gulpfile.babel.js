'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import gulpIf from 'gulp-if';
import cssnano from 'gulp-cssnano';
import smushit from 'gulp-smushit';
import jscs from 'gulp-jscs';
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
import postcss from 'gulp-postcss';
import arialinter from 'gulp-arialinter';
import autoprefixer from 'autoprefixer';
import rq from 'run-sequence';
import del from 'del';


//Paths
let app = 'app/';
let dist = 'dist/';
let tmp = '.tmp/'

let loc_svg = 'assets/svg/';
let loc_images = 'assets/images/';
let loc_sass = 'assets/sass/';
let loc_css = 'assets/css/';
let loc_js = 'assets/js/';
let loc_includes = 'includes/';
let loc_fonts = 'assets/fonts/';
let loc_fonts_bootstrap = loc_fonts + 'bootstrap/';

let node_fontawesome = 'node_modules/font-awesome/fonts/*';
let node_bootstrap_font = 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*';


//
// Collective functions (destination as .tmp or dist)
//


// BrowserSync WebServer ( dest == files directory )
function webServer(dest) {
  return browserSync.init({
    server: {
      baseDir: dest
    }
  });
}

// Create SVG sprite
function createSVG(dest) {
  return gulp.src(app + loc_svg + '*.svg')
    .pipe(svgstore())
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest(dest + loc_svg));
}

// Compresses images
function compressImages(dest) {
  return gulp.src(app + loc_images + '*')
    .pipe(smushit())
    .pipe(gulp.dest(dest + loc_images))
};

// Compile Sass, autoprefix, minify when dist
function sassCompiler(dest) {
  function compileSass() {
    return gulp.src(app + loc_sass + 'app.scss')
      .pipe(sass())
      .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
      .pipe(rename('styles.min.css'))
  }

  if(dest == tmp) {
    return compileSass()
      .pipe(gulp.dest(dest + loc_css))
      .pipe(browserSync.stream());
  } else if (dest == dist) {
    return compileSass()
      .pipe(cssnano())
      .pipe(gulp.dest(dest + loc_css));
  }
}

// Minifying-combining task -- js (css also possible)
function combine(dest) {
  if(dest == tmp) {
    return gulp.src(app + '*.html')
      .pipe(arialinter({
        level: 'AA'
      }))
      .pipe(useref())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream())
  } else if (dest == dist) {
    return gulp.src(app + '*.html')
      .pipe(arialinter({
        level: 'AA'
      }))
      .pipe(useref())
      .pipe(gulpIf('*.js', uglify()))
      //.pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest(dest))
  }
}

// Copy includes folder
function includes(dest) {
  return gulp.src(app + loc_includes + '**/*')
    .pipe(arialinter({
      level: 'AA'
    }))
    .pipe(gulp.dest(dest + loc_includes))
}

// Copy fonts
function fonts(dest) {
  gulp.src(node_fontawesome).pipe(gulp.dest(dest + loc_fonts));
  gulp.src(node_bootstrap_font).pipe(gulp.dest(dest + loc_fonts_bootstrap));
}


//
// Development Tasks ( .tmp directory )
//

//* Project initialization

gulp.task('init', ['icons', 'images', 'fonts', 'jscs', 'combine', 'includes', 'sass'], () => rq('serve'));

//* Watch SASS, JS, HTML -- I keep an eye on everything
gulp.task('serve', ['server'], () => {
  gulp.watch(app + loc_includes + '**/*', ['includes']);
  gulp.watch(app + loc_sass + '**/*.scss', ['sass']);
  gulp.watch(app + loc_js + '**/*.js', ['jscs','combine']);
  gulp.watch(app + 'index.html', ['combine']);
});

//1. WebServer
gulp.task('server', () => webServer(tmp));

//2. SASS to CSS, Autoprefix, Move to tmp folder
gulp.task('sass', () => sassCompiler(tmp));

//3. Linting js files
gulp.task('jscs', () => gulp.src(app + loc_js + '*.js')
  .pipe(jscs({fix: true}))
  .pipe(gulp.dest(app + loc_js)));

//4. Combine js files (combining css files is also possible). Config in index.html
gulp.task('combine', () => combine(tmp));

//5. Compressing images
gulp.task('imgcompress', () => compressImages(tmp));

//6. Creating svg sprite
gulp.task('icons', () => createSVG(tmp));

//7. Copy images to tmp
gulp.task('images', () => gulp.src(app + loc_images + '**/*')
  .pipe(gulp.dest(tmp + loc_images)));

//8. Copy views and partials to tmp
gulp.task('includes', () => includes(tmp)
  .pipe(browserSync.stream()));

//9. Copy fonts
gulp.task('fonts', () => fonts(tmp));

//
// Dist Tasks ( dist directory )
//


//* Build and serve
gulp.task('dist:build', ['dist:sass', 'dist:combine', 'dist:compress', 'dist:icons', 'dist:includes', 'dist:fonts']);

//1. WebServer
gulp.task('dist:server', () => webServer(dist));

//2. SASS to CSS, Autoprefix, cssmin, Move to dist folder
gulp.task('dist:sass', () => sassCompiler(dist));

//4. Combine js files, minify (combining css files is also possible)
gulp.task('dist:combine', ['dist:sass'], () => combine(dist));

//5. Compressing images
gulp.task('dist:compress', () => compressImages(dist));

//6. Creating svg sprite
gulp.task('dist:icons', () => createSVG(dist));

//7. Copy views and partials to dist
gulp.task('dist:includes', () => includes(dist));

//8. Copy fonts
gulp.task('dist:fonts', () => fonts(dist));

//9. Clean dist
gulp.task('dist:clean', () => del.sync(dist));
