const gulp = require( "gulp" );
const htmlmin = require( "gulp-htmlmin" );
const plumber = require( "gulp-plumber" );
const sourcemap = require( "gulp-sourcemaps" );
const less = require( "gulp-less" );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( "autoprefixer" );
const csso = require( "postcss-csso" );
const terser = require("gulp-terser");
const rename = require( "gulp-rename" );
const browserSync = require( "browser-sync" ).create();
const imagemin = require( "gulp-imagemin" );
const concat = require( "gulp-concat" );
const imgCompress = require( "imagemin-jpeg-recompress" );
const imageminPngquant = require( "imagemin-pngquant" );
const newer = require( "gulp-newer" );
const svgSprite = require( "gulp-svg-sprite" );
const replace = require( "gulp-replace" );
const webp = require( "gulp-webp" );

// npm uninstall gulp-imagemin --save-dev
// npm install gulp-imagemin@7.1.0 --save-dev


/* FILES PATHS */

// Project info

const buildFolder = "./build";

// Название текущего проекта

const projectName = "restaurant";

const themePath = `${ buildFolder }/`; // For other cases
const htmlMin = false; // HTML minification (false by default)

const paths = {
  prod: {
    build: `${ buildFolder }`,
  },
  html: {
    src: "./src/*.html",
    dest: `${ buildFolder }`,
    watch: [ "./src/*.html" ],
  },
  less: {
    src: "./src/less/style.less",
    dest: `${ themePath }/css`,
    watch: [ "./src/less/**/*.less", "./src/js/components/**/*.less" ],
  },
  js: {
    src: "./src/js/main.js",
    dest: `${ themePath }/js`,
    watch: "./src/js/*.js",
  },
  images: {
    src: [ "./src/img/**/*", "!./src/img/*.svg", "!./src/img/**/*.webp" ],
    dest: `${ themePath }/img`,
    watch: [ "./src/img/**/*", "!./src/img/*.svg", "!./src/img/**/*.webp" ],
  },
  webpImages: {
    src: "./src/img/**/*.webp",
    dest: `${ themePath }/img`,
    watch: "./src/img/**/*.webp",
  },
  svgSprite: {
    src: "./src/img/icons/*.svg",
    dest: `${ themePath }/img/icons`,
    watch: "./src/img/icons/*.svg",
  },
  svg: {
    src: [ "./src/img/*.svg", "!./src/img/icons/*.svg" ],
    dest: `${ themePath }/img/`,
    watch: [ "./src/img/*.svg", "!./src/img/icons/*.svg" ],
  },
  fonts: {
    src: "./src/fonts/**/*",
    dest: `${ themePath }/fonts`,
    watch: "./src/fonts/*",
  },
  assets: {
    src: "./src/assets/*.*",
    dest: `${ themePath }/assets`,
    watch: "./src/assets/*.*",
  }
};

// Project build type (development or production)
let isDev = true; // Оставить true для development или заменить на false для production версии сборки проекта
let isProd = !isDev;
// let jsFilename = isDev ? "./[name].js" : "./[name].min.js";


// TASKS

// Html
const html = () => {
  return gulp
    .src( paths.html.src )
    .pipe( htmlmin( { collapseWhitespace: true } ) )
    .pipe( gulp.dest( paths.html.dest ) )
    .pipe( browserSync.stream() );
};
exports.html = html;

/* LESS TO CSS CONVERTATION & MINIFICATION */
const styles = () => {
  return gulp
    .src( paths.less.src )
    .pipe( plumber() )
    .pipe( sourcemap.init() )
    // .pipe( concat( "style.less" ) )
    .pipe( less() )
    .pipe( postcss( [ autoprefixer(), csso() ] ) )
    .pipe( rename( "style.min.css" ) )
    .pipe( sourcemap.write( "." ) )
    .pipe( gulp.dest( paths.less.dest ) )
    .pipe( browserSync.stream() );
};
exports.styles = styles;


// Task на скрипты JS 
const scripts = () => {
  return gulp.src( paths.js.src )
    .pipe( sourcemap.init() ) // инициализируем создание Source Maps
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(sourcemap.write(".")) // пути для записи SourceMaps - в данном случае карта SourceMaps будет добавлена прям в данный файл scripts.min.js в самом конце в формате комментария
    .pipe( gulp.dest( paths.js.dest ) )
    .pipe( browserSync.stream() );
};
exports.scripts = scripts;

/* IMAGES MINIFICATION */

const imgmin = () => {
  return gulp
    .src( paths.images.src )
    .pipe( newer( paths.images.dest ) )
    .pipe(
      imagemin( [
        imgCompress( {
          loops: 4,
          min: 70,
          max: 80,
          quality: "high",
        } ),
        imageminPngquant( { quality: [ 0.7, 0.8 ], speed: 4 } ),
      ] )
    )
    .pipe( gulp.dest( paths.images.dest ) )
    .pipe( browserSync.stream() );
};
exports.imgmin = imgmin;

/* IMAGES JPG/JPEG & PNG TO WEBP CONVERTATION */

const createWebp = () => {
  return gulp
    .src( paths.images.src )
    .pipe( plumber() )
    .pipe( webp() )
    .pipe( gulp.dest( paths.images.dest ) )
    .pipe( browserSync.stream() );
};
exports.createWebp = createWebp;

/* SVG SPRITES */

const sprites = () => {
  return (
    gulp
      .src( paths.svgSprite.src )
      .pipe( plumber() )
      .pipe( newer( paths.svgSprite.dest ) )
      .pipe(
        imagemin( [
          imagemin.svgo( {
            plugins: [
              {
                removeViewBox: true,
              },
              {
                cleanupIDs: false,
              },
            ],
          } ),
        ] )
      )
      .pipe( replace( "&gt;", ">" ) )
      .pipe(
        svgSprite( {
          mode: {
            symbol: {
              sprite: "../sprite.svg",
            },
          },
        } )
      )
      .pipe( gulp.dest( paths.svgSprite.dest ) )
      .pipe( browserSync.stream() )
  );
};
exports.sprites = sprites;

/* SVG MINIFICATION */

const svg = () => {
  return gulp
    .src( paths.svg.src )
    .pipe( plumber() )
    .pipe( newer( paths.svg.dest ) )
    .pipe(
      imagemin( [
        imagemin.svgo( {
          plugins: [
            {
              removeViewBox: true,
            },
            {
              cleanupIDs: false,
            },
          ],
        } ),
      ] )
    )
    .pipe( gulp.dest( paths.svg.dest ) )
    .pipe( browserSync.stream() );
};
exports.svg = svg;

/* FONTS MOVING TO BUILD */

const fonts = () => {
  return gulp
    .src( paths.fonts.src )
    .pipe( plumber() )
    .pipe( newer( paths.fonts.dest ) )
    .pipe( gulp.dest( paths.fonts.dest ) )
    .pipe( browserSync.stream() );
};
exports.fonts = fonts;

// ASSETS MOVING TO BUILD

const assets = () => {
  return gulp
    .src( paths.assets.src )
    .pipe( plumber() )
    .pipe( newer( paths.assets.dest ) )
    .pipe( gulp.dest( paths.assets.dest ) )
    .pipe( browserSync.stream() );
};

 // Reload
const reload = (done) => {
  browserSync.reload( { stream: true } );
  done();
};

// Server
const server = (done) => {
  browserSync.init( {
    server: {
      baseDir: paths.prod.build,
    },
    reloadOnRestart: true,
    cors: true,
    notify: false,
    ui: false,
  } );
  done();
};
exports.server = server;

// Watcher
const watcher = () => {
  gulp.watch( paths.less.watch, gulp.series( styles ) );
  gulp.watch( paths.js.watch, gulp.series( scripts ) );
  gulp.watch( paths.html.watch, gulp.series( html, reload ) );
  gulp.watch( paths.images.watch, gulp.series( imgmin, reload ) );
  gulp.watch( paths.images.watch, gulp.series( createWebp, reload ) );
  gulp.watch( paths.svgSprite.watch, gulp.series( sprites, reload ) );
  gulp.watch( paths.svg.watch, gulp.series( svg, reload ) );
  gulp.watch( paths.fonts.watch, gulp.series( fonts, reload ) );
  gulp.watch( paths.assets.watch, gulp.series( assets, reload ) );

};

exports.default = gulp.series(
  // clean,
  imgmin,

  gulp.parallel( html, styles, sprites, scripts, createWebp, svg, fonts, assets ),
  gulp.series( server, watcher )
);

const prod = gulp.series(
  // clean,
  fonts,
  assets,
  gulp.parallel( styles, html, scripts, imgmin, createWebp, sprites, svg,   ),
  gulp.series( server, watcher )
);
exports.prod = prod;

