
const { src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css(done) {
  
  src( "src/scss/**/*.scss") //Identificar el archivo sass

  // !  **/* esto significa que va a escuchar por los cambios de todos los archivos con la extension .scss
  .pipe( plumber())
  .pipe( sass()) //compilarlo
  .pipe( dest("build/css")) // almacenarlo en el disco duro

  done() //Esto es un callback que avisa a gulp cuando llegamos al final
}

function dev(done){
  watch("src/scss/**/*.scss", css)
}

exports.css = css;
exports.dev = dev;