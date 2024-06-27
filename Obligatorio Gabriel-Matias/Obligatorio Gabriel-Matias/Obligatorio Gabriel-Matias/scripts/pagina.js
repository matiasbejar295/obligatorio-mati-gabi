let juegosPreCargados = [
    {id:1, nombre:"ForLine", precio: 1200,genero:"Accion", imagen:"images/Forline.jpeg",clasificacion: 13, descripcion: "Juego de destreza y habilidad"},
    {id:2, nombre:"Legend Of Celery", precio: 1300,genero:"Aventura", imagen:"images/Legend of Celery.jpeg",clasificacion: 5,descripcion: "Juego de aventura y criaturas exoticas"},
    {id:3, nombre:"Hate of Speed", precio: 950,genero:"Carrera", imagen:"images/Hate of Speed.jpeg",clasificacion: 13, descripcion: "Juego con muchos modelos de autos y adrenalina"},
    {id:4, nombre:"Jurassic Kids", precio: 600,genero:"Infantil", imagen:"images/Jurassic Kids.jpg",clasificacion: 5, descripcion: "Juego muy divertido si tenes menos de 5 años"},
]

let JUEGOS = []
let contadorId = cargarContadorDelStorage() 

// Función para guardar el contador en el localStorage
function guardarContadorEnStorage(){
    localStorage.setItem("contador", JSON.stringify(contadorId))
}

// Función para cargar el contador del localStorage
function cargarContadorDelStorage() {
    let contadorGuardado = localStorage.getItem("contador");
    if (contadorGuardado !== null) {
        return JSON.parse(contadorGuardado);
    }
    return juegosPreCargados.length + 1;  // Si no hay contador guardado, iniciar después del último juego pre-cargado
}

// Función para guardar el array JUEGOS en el localStorage
function guardarEnLocalStorage(){
    localStorage.setItem("actualizarJUEGOS", JSON.stringify(JUEGOS))
}

// Función para guardar los juegos pre cargados en el localStorage
function guardarJuegosPreCargadosEnLocalStorage(){
    localStorage.setItem("actualizarJUEGOS", JSON.stringify(juegosPreCargados))
}

// Función para cargar los juegos pre cargados del localStorage
function cargarJuegosPreCargadosEnLocalStorage(){
    let juegosPreCargadosStorage = localStorage.getItem("actualizarJUEGOS");
    if (juegosPreCargadosStorage !== null) {
        JUEGOS = JSON.parse(juegosPreCargadosStorage);
    }
}

// Función para cargar datos del local storage
function cargarDatosDelLocalStorage(){
    let localStorageJuegos = localStorage.getItem("actualizarJUEGOS");
    if (localStorageJuegos) {
        JUEGOS = JSON.parse(localStorageJuegos);
    }
    if (JUEGOS.length === 0) {
        cargarJuegosPreCargadosEnLocalStorage();
    }
    insertarArrayJuegosEnHtml();
}

// Eliminar Juegos del array JUEGOS
function eliminarJuego(id) {
    JUEGOS = JUEGOS.filter(juego => juego.id !== id);
    contadorId++;
    guardarEnLocalStorage();
    insertarArrayJuegosEnHtml();  // Actualizar la visualización después de eliminar
    return JUEGOS;
}

// Actualizar juegos después de eliminar
function insertarArrayJuegosEnHtml() {
    let juegoIngresado = document.getElementById("juego-agregado");
    juegoIngresado.innerHTML = "";
    for (let juego of JUEGOS) {
        agregarJuegosAlHtml(juego);
    }
}

// Función para cambiar de string a número
function inputANumero(){
    let input = document.getElementById("precio").value;
    return Number(input);
}

// Agregar juegos desde el administrador
function agregarJuegoAlArray() {
    let idJuego = contadorId;
    let nombreJuego = document.getElementById("nombre").value;
    let precioJuego = inputANumero();
    let generoJuego = document.getElementById("genero").value;
    let imagenJuego = document.getElementById("imagen").value;
    let clasificacionJuego = document.getElementById("clasificacion").value;
    let descripcionJuego = document.getElementById("descripcion").value;
    
    if (nombreJuego === "" || precioJuego === "" || generoJuego === "" || imagenJuego === "" || clasificacionJuego === "" || descripcionJuego === "") {
        alert("Debe completar todos los campos")
        return
    }
    
    let agregarJuego = {
        id: idJuego,
        nombre: nombreJuego, 
        precio: precioJuego,
        genero: generoJuego, 
        imagen: imagenJuego,
        clasificacion: clasificacionJuego,
        descripcion: descripcionJuego
    }

    JUEGOS.push(agregarJuego);

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("clasificacion").value = "";
    document.getElementById("descripcion").value = "";
    contadorId++;
    guardarContadorEnStorage();
    guardarEnLocalStorage();
    agregarJuegosAlHtml(agregarJuego);
}

// Agregar juego del array JUEGOS al HTML
function agregarJuegosAlHtml(juego) {
    let divJuego = document.createElement("div");
    divJuego.classList.add("juego-en-carrito");
    divJuego.dataset.id = juego.id;
    let h1Juego = document.createElement("h1");
    h1Juego.innerHTML = juego.nombre;
    let imgJuego = document.createElement("img");
    imgJuego.src = juego.imagen;
    imgJuego.classList.add("imagen-de-juego");
    imgJuego.alt = juego.nombre;
    let h2Juego = document.createElement("h2");
    h2Juego.innerHTML = "Precio: $ " + juego.precio;
    let pJuego = document.createElement("h2");
    pJuego.innerHTML = "Género: " + juego.genero;
    let h3Clasificacion = document.createElement("h3");
    h3Clasificacion.innerHTML = "Clasificación: " + juego.clasificacion;
    let pDescripcion = document.createElement("p");
    pDescripcion.innerHTML = "Descripción: " + juego.descripcion;
    let botonEliminar = document.createElement("button");
    botonEliminar.innerHTML = "X";
    botonEliminar.addEventListener("click", function() {
        eliminarJuego(juego.id);
    });

    divJuego.appendChild(h1Juego);
    divJuego.appendChild(imgJuego);
    divJuego.appendChild(h2Juego);
    divJuego.appendChild(pJuego);
    divJuego.appendChild(h3Clasificacion);
    divJuego.appendChild(pDescripcion);
    divJuego.appendChild(botonEliminar);

    let contenedor = document.getElementById("juego-agregado");
    contenedor.appendChild(divJuego);
}

// Al cargar el DOM, cargar los datos del local storage y agregar el evento para agregar juegos
document.addEventListener('DOMContentLoaded', function() {
    guardarJuegosPreCargadosEnLocalStorage()
    cargarDatosDelLocalStorage();
    document.getElementById("Agregar-Juego").addEventListener("click", agregarJuegoAlArray);
});