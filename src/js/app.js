document.addEventListener('DOMContentLoaded', function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  sticky();
}

function scrollNav(){
  enlaces = document.querySelectorAll('.navegacion-principal a');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(e){
      e.preventDefault();
      const seccionScroll= e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView( {behavior:"smooth"});

    })
  });
}

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes')
 

  for (let i = 1; i <= 12; i++) {
    const img = document.createElement("picture");
    img.innerHTML = `
    <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <img loading="lazy" src="build/img/thumb/${i}.webp" alt="Imagen galeria">
    `
    galeria.appendChild(img);

    img.onclick = function() {
      mostrarImg(i)
    }
    
  }
};

function mostrarImg(id) {
  const img = document.createElement("picture");
    img.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
      <img loading="lazy" src="build/img/grande/${id}.webp" alt="Imagen galeria">
    `

    //Crear el overlay con la imagen
    const overlay = document.createElement("div");
    overlay.appendChild(img);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
      overlay.remove();

      const body = document.querySelector('body')
      body.classList.remove("fijar-body")
    }

    //boton para cerrar la ventana modal
    const btnCerrar = document.createElement('P');
    btnCerrar.textContent = "X";
    btnCerrar.classList.add('btn-cerrar');
    btnCerrar.onclick = function () {
      overlay.remove();

      const body = document.querySelector('body')
      body.classList.remove("fijar-body")
    }
    overlay.appendChild(btnCerrar);



    //Mostrarlo en el HTML
    const body = document.querySelector('body')
    body.appendChild(overlay);
    body.classList.add("fijar-body")
}

// *NAVEGACION FIJA

function sticky() {
  const header = document.querySelector('.header');
  const sobreFestival = document.querySelector('.sobre-festival')
  const body = document.querySelector("body")

  window.addEventListener('scroll', function() {
   if(sobreFestival.getBoundingClientRect().bottom < 0 ){
    header.classList.add('sticky')
    body.classList.add('body-scroll')
   }else{
    header.classList.remove('sticky')
    body.classList.remove('body-scroll')
   }
  })
} 