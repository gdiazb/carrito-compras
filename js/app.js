//variables
const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')

let articulosCarrito = []

//funciones
function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso)
  carrito.addEventListener('click', borrarCurso)
  vaciarCarrito.addEventListener('click', (e) => {
    e.preventDefault();
    articulosCarrito = []
    carritoHTML()
  })
}
cargarEventListeners()

function agregarCurso(e) {
  if (e.target.classList.contains('agregar-carrito')) {
    e.preventDefault();
    const datosCurso = e.target.parentElement.parentElement
    leerDatosCurso(datosCurso)
  }
}

function borrarCurso(e) {
  if(e.target.classList.contains('borrar-curso')){
    console
    e.preventDefault();
    const idCurso = e.target.getAttribute('data-id')
    
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== idCurso)
    carritoHTML()
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    title: curso.querySelector('.card__title').textContent,
    price: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  }

  const existeArticulo = articulosCarrito.some(curso => curso.id === infoCurso.id) 
  if(existeArticulo) {
    const cursos = articulosCarrito.map(curso => {
      if(curso.id === infoCurso.id) {
        curso.cantidad++
        return curso
      } else {
        return curso
      }
    })
    articulosCarrito = [...cursos]
  } else {
    // agrega elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
  }
  
  carritoHTML()
}

function carritoHTML() {
  limpiarHTML()
  articulosCarrito.forEach(curso => {
    const { imagen, title, price, cantidad, id } = curso
    const row = document.createElement('tr')
    row.setAttribute('id', `carrito-${id}`)
    row.innerHTML = `
      <td><image src="${imagen}" /></td>
      <td>${title}</td>
      <td>${price}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}"> x </a></td>
    `
    contenedorCarrito.appendChild(row)
  });
}

function limpiarHTML() {
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}
