
const { src, dest, watch, parallel} = require("gulp");

// *CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require('gulp-sourcemaps')

//*IMAGENES

const cache = require("gulp-cache")
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif')
const terser = require("gulp-terser-js");

function css(done) {
  
  src( "src/scss/**/*.scss") //Identificar el archivo sass
  // !  **/* esto significa que va a escuchar por los cambios de todos los archivos con la extension .scss
  .pipe( sourcemaps.init())
  .pipe( plumber())
  .pipe( sass()) //compilarlo
  .pipe(postcss([autoprefixer(), cssnano()]) )
  .pipe(sourcemaps.write('.'))
  .pipe( dest("build/css")) // almacenarlo en el disco duro

  done() //Esto es un callback que avisa a gulp cuando llegamos al final
}

function imagenes( done ) {

  const opciones = {
    optimizationLevel: 3
  }
  src("src/img/**/*.{jpg, png}")
  .pipe( cache(imagemin(opciones)))
  .pipe ( dest("build/img"))

  done();
}

function formatoWebp (done){

  const opciones = {
    quality: 50
  };

  src("src/img/**/*.{jpg, png}")
    .pipe( webp(opciones))
    .pipe ( dest("build/img"))

  done();
}

function formatoAvif (done){

  const opciones = {
    quality: 50
  };

  src("src/img/**/*.{jpg, png}")
    .pipe( avif(opciones))
    .pipe ( dest("build/img"))

  done();
}

function javascript( done ) {
  src("src/js/**/*.js")
  .pipe( sourcemaps.init())
  .pipe( terser())
  .pipe( sourcemaps.write('.'))
  .pipe( dest("build/js"))

  done();
}

function dev(done){
  watch("src/scss/**/*.scss", css)
  watch("src/js/**/*.js", javascript)
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.formatoWebp = formatoWebp;
exports.formatoAvif = formatoAvif;
exports.dev = parallel( imagenes, formatoWebp, formatoAvif,javascript, dev );