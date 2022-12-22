
const { src, dest, watch, parallel} = require("gulp");

// *CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//*IMAGENES

const webp = require('gulp-webp');

function css(done) {
  
  src( "src/scss/**/*.scss") //Identificar el archivo sass

  // !  **/* esto significa que va a escuchar por los cambios de todos los archivos con la extension .scss
  .pipe( plumber())
  .pipe( sass()) //compilarlo
  .pipe( dest("build/css")) // almacenarlo en el disco duro

  done() //Esto es un callback que avisa a gulp cuando llegamos al final
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

function dev(done){
  watch("src/scss/**/*.scss", css)
}

exports.css = css;
exports.formatoWebp = formatoWebp;
exports.dev = parallel( formatoWebp, dev );