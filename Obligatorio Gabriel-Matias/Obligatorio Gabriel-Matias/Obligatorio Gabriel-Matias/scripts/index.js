
let JUEGOS =[]
let CARRITO =[]
let contador = cargarContadorDelStorage()

//Funcion para guardar carrito en localStorage
function guardarCarritoEnLocalStorage(){
    localStorage.setItem("CarritoDeCompras",JSON.stringify(CARRITO))
}

//Funcion para ir guardando contador

function guardarContadorEnStroage(){
    localStorage.setItem("contador" , JSON.stringify(contador))
}
//funcion para cargar el contador actualizado
function cargarContadorDelStorage() {
    let contadorGuardado = localStorage.getItem("contador");
    if (contadorGuardado !== null) {
        contadorGuardado = JSON.parse(contadorGuardado);
    }else{
        contadorGuardado = 1
    }
    return contadorGuardado;
}

//Cargar juegos del local Storage a la pagina principal
function cargarDatosDelLocalStorage(){
    let localStorageJuegos = localStorage.getItem("actualizarJUEGOS");
    if(localStorageJuegos.length > 0){
        JUEGOS = JSON.parse(localStorageJuegos);
        insertarArrayDeJuegosEnHtml(JUEGOS);
    }else{
        JUEGOS = cargarJegosPreCargadosEnLocalStrage()
        
    }
    insertarArrayDeJuegosEnHtml(JUEGOS)
}


//Eliminar Juego del carrito con el

function eliminarJuegoCarrito(id){
    CARRITO = CARRITO.filter(juegoCarrito => juegoCarrito.id !== id)
    return CARRITO
}

//Funcion para agregar carrito al html
function agregarCarritoAlHtml(carrito){
    let divCarrito = document.createElement("div")
    divCarrito.classList.add("juegos-en-carrito")
    let nombreCarrito = document.createElement("p")
    nombreCarrito.innerHTML = carrito.nombre
    let imgCarrito = document.createElement("img")
    imgCarrito.src = carrito.imagen
    imgCarrito.alt = carrito.nombre
    let precioCarrito = document.createElement("p")
    precioCarrito.innerHTML = "$ " + carrito.precio
    let botonEliminar = document.createElement("button")
    botonEliminar.classList.add("boton-eliminar-del-carrito")
    botonEliminar.innerHTML= "X"
    botonEliminar.addEventListener("click", function(){
        eliminarJuegoCarrito(carrito.id)
        cantidadDeElementosEnCarrito(CARRITO)
        totalPrecio(CARRITO)
        insertarArrayDeCarritoEnHtml(CARRITO)
    })

    divCarrito.appendChild(nombreCarrito)
    divCarrito.appendChild(imgCarrito)
    divCarrito.appendChild(precioCarrito)
    divCarrito.appendChild(botonEliminar)

    return divCarrito
}

//Funcion Agregar juego al HTML

function crearCasillaDeJuego(juego){
    let divJuego = document.createElement("div")
    divJuego.classList.add("casilla-de-juego")
    divJuego.dataset.id = juego.id
    let h1Juego = document.createElement("h1")
    h1Juego.innerHTML = juego.nombre
    let imgJuego = document.createElement("img")
    imgJuego.src = juego.imagen
    imgJuego.classList.add("imagen-de-juego")
    imgJuego.alt = juego.nombre
    let h2Juego = document.createElement("h2")
    h2Juego.innerHTML = "Precio: $ " + juego.precio
    let h2Juego2 = document.createElement("h2")
    h2Juego2.innerHTML = "Genero: " + juego.genero
    let h3Juego = document.createElement("h3")
    h3Juego.innerHTML = "Clasificacion: +" + juego.clasificacion
    let pJuego2 = document.createElement("p")
    pJuego2.innerHTML = "Descripcion: " + juego.descripcion
    let buttonComprar = document.createElement("button")
    buttonComprar.dataset.id = juego.id
    buttonComprar.innerHTML = "Comprar"
    
    buttonComprar.addEventListener("click", function(){
        CARRITO.push(juego)
        contador++
        guardarContadorEnStroage()
        cantidadDeElementosEnCarrito(CARRITO)
        totalPrecio(CARRITO)
        insertarArrayDeCarritoEnHtml(CARRITO)
        
    })
    
    divJuego.appendChild(h1Juego)
    divJuego.appendChild(imgJuego)
    divJuego.appendChild(h2Juego)
    divJuego.appendChild(h2Juego2)
    divJuego.appendChild(h3Juego)
    divJuego.appendChild(pJuego2)
    divJuego.appendChild(buttonComprar)

    return divJuego
}

//Agregar los juegos del array carrito al html

function insertarArrayDeCarritoEnHtml(carrito) {
    let contenedorDeCarrito = document.getElementById("Carrito-compras");
    contenedorDeCarrito.innerHTML = "";
    for (let i = 0; i < carrito.length; i++) {
        let div = agregarCarritoAlHtml(carrito[i]);
        contenedorDeCarrito.appendChild(div)
    }
}

//Agregar los juegos del Array al html

function insertarArrayDeJuegosEnHtml(juegos) {
    let contenedorDeJuego = document.getElementById("grilla-juegos");
    contenedorDeJuego.innerHTML = "";
    for (let i = 0; i < juegos.length; i++) {
        let div = crearCasillaDeJuego(juegos[i]);
        contenedorDeJuego.appendChild(div)
    }
}

//Mostrar cantidad de elementos en el Carrito

function cantidadDeElementosEnCarrito(carrito){
    let cantidad = document.getElementById("totalUnidades")
    cantidad.innerHTML = carrito.length
}

//Sumar precio total del carrito con descuento de 15% por mas de 3 unidades

function totalPrecio(carrito){
    let spanTotalPrecioCarrito = document.getElementById("totalPrecio");
    let precioTotal = 0;
    for (let i = 0; i < carrito.length; i++){
        precioTotal += carrito[i].precio
    } 
    
    if (carrito.length > 3){
        precioTotal *= 0.85
    }
    spanTotalPrecioCarrito.innerHTML = "$ " + precioTotal;
}

document.addEventListener('DOMContentLoaded', function() {
    cargarDatosDelLocalStorage();
    cantidadDeElementosEnCarrito(CARRITO)
    totalPrecio(CARRITO)
})