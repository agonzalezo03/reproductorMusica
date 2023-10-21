const body = document.getElementsByTagName("body");
const nombre = document.getElementById("nombre");
const imgCancion = document.getElementById("imagenCancion");
const imgFondo = document.getElementById("imagen")
const lista = document.getElementById("lista");
const botonPlay = document.getElementById("botonPlay");
const barraDuracion = document.getElementById("barraDuracion");
const duracionCancion = document.getElementById("duracionTiempo");
const botonBack = document.getElementById("botonBack");
const botonNext = document.getElementById("botonNext");
const botonBucle = document.getElementById("botonBucle");
const botonAleatorio = document.getElementById("botonAleatorio");
const barraVolumen = document.getElementById("volumen");
const listaCanciones = document.querySelectorAll(".cancionLista");
let cancionActive = document.querySelector(".active");
let canciones = document.querySelectorAll("audio");


let nombresCanciones = ["Malamanera", "Reproches", "Tecknocity"];
let nombresArtistas = ["Fernando Costa", "Ayax y Prock", "Parckineos"]
let imagenesCanciones = ["./media/img/malamanera.jpg", "./media/img/reproches.jpg", "./media/img/tecknocity.jpg"];
let cancionActual = 0;
let listaActual = 1;
let play = false;
let aleatorio = false;
let bucle = false;

actualizarNombre();
botonPlay.addEventListener("click", playMusica);

botonNext.addEventListener("click", nextMusica);
botonBack.addEventListener("click", backMusica);

cancionActive.addEventListener("ended", nextMusica);

actualizarDuracion()


botonAleatorio.addEventListener("click", ()=> {
    if(aleatorio){
        aleatorio = false;
        botonAleatorio.src = "./media/img/aleatorio.png";
    }else{
        aleatorio = true;
        botonAleatorio.src = "./media/img/aleatorio-active.png";
    }
})

botonBucle.addEventListener("click", ()=>{
    if(bucle){
        bucle = false;
        botonBucle.src = "./media/img/lazo.png";
        cancionActive.removeAttribute("loop");
    }else{
        bucle = true;
        botonBucle.src = "./media/img/lazo-active.png";
        cancionActive.setAttribute("loop", "");
    }
})

barraVolumen.addEventListener("input", ()=> {
    const nuevoVolumen = parseFloat(barraVolumen.value);
    cancionActive.volume = nuevoVolumen;
});


function nextMusica(){
    console.log(canciones);

    const listaActiva = document.getElementById(`lista${listaActual}`)

    cancionActive.pause();
    cancionActive.currentTime = 0;
    cancionActive.classList.remove("active");

    listaActiva.classList.remove("cancionActive");
    listaActiva.classList.add("cancionInactive");
    
    if(aleatorio){
        
        do{
            var numAleatorio = Math.floor(Math.random() * canciones.length);
            
        }while(numAleatorio == cancionActual);
        console.log("numAleatorio" + numAleatorio)
        cancionActual = numAleatorio;
        listaActual =   cancionActual + 1
    }
    else{

    

    cancionActual++; 
    listaActual++;
    

    if (cancionActual >= canciones.length) {
        cancionActual = 0; 
        listaActual = 1;
    }
}
    

    cancionActive = canciones[cancionActual];
    cancionActive.play();
    cancionActive.classList.add("active");
    imgCancion.classList.add("rotate");
    botonPlay.src = "./media/img/boton-de-pausa-de-video.png"
    play = true;
    
    const nuevaCancionActiva = document.getElementById(`lista${listaActual}`)
    nuevaCancionActiva.classList.remove("cancionInactive");
    nuevaCancionActiva.classList.add("cancionActive");

    actualizarNombre();

    actualizarDuracion();

}

function backMusica(){
    console.log(canciones);

    const listaActiva = document.getElementById(`lista${listaActual}`)

    cancionActive.pause();
    cancionActive.currentTime = 0;
    cancionActive.classList.remove("active");

    listaActiva.classList.remove("cancionActive");
    listaActiva.classList.add("cancionInactive");

    cancionActual--;
    listaActual--; 

    if (cancionActual < 0) {
        cancionActual = canciones.length - 1; 
        listaActual = canciones.length;
    }
    if(aleatorio){
        cancionActual = Math.floor(Math.random() * 3);
        listaActual =   cancionActual + 1
    }

    cancionActive = canciones[cancionActual];
    cancionActive.play();
    cancionActive.classList.add("active");
    imgCancion.classList.add("rotate");
    botonPlay.src = "./media/img/boton-de-pausa-de-video.png"
    play = true;
    const nuevaCancionActiva = document.getElementById(`lista${listaActual}`)
    nuevaCancionActiva.classList.remove("cancionInactive");
    nuevaCancionActiva.classList.add("cancionActive");

    actualizarNombre();

    actualizarDuracion();

}

function playMusica(){
    if(play){
        play = false;
        cancionActive.pause();
        imgCancion.classList.remove("rotate");
        
        botonPlay.src = "./media/img/boton-de-play.png"
    }else{
        play = true;
        cancionActive.play();
        imgCancion.classList.add("rotate");
        
        botonPlay.src = "./media/img/boton-de-pausa-de-video.png"
    }
    

    actualizarDuracion();
  
}


function actualizarNombre(){
    nombre.innerHTML = 
    `<h1>${nombresCanciones[cancionActual]}</h1>
    <p>${nombresArtistas[cancionActual]}</p>`;

    imgCancion.src = imagenesCanciones[cancionActual];

    imgFondo.style.backgroundImage = `url("${imagenesCanciones[cancionActual]}")`;

}


console.log(listaCanciones)


listaCanciones.forEach((element, index) => {
    element.addEventListener("click", () => {

        cancionActive.pause();
        cancionActive.currentTime = 0;
        cancionActive.classList.remove("active");

        cancionActive = canciones[index];
        cancionActive.play();
        cancionActive.classList.add("active");


        listaCanciones.forEach((lista, listaIndex) => {
            if (index === listaIndex) {
                lista.classList.remove("cancionInactive");
                lista.classList.add("cancionActive");
            } else {
                lista.classList.remove("cancionActive");
                lista.classList.add("cancionInactive");
            }
        });
        cancionActual = index;
        botonPlay.src = "./media/img/boton-de-pausa-de-video.png"
        play = true;
        actualizarNombre();
        imgCancion.src = imagenesCanciones[index];
        imgCancion.classList.add("rotate");
        actualizarDuracion();
    });
});




function actualizarDuracion(){

    cancionActive.addEventListener("ended", nextMusica);
        const duracionTotal = cancionActive.duration;
        barraDuracion.setAttribute("max", cancionActive.duration);

   
    
    cancionActive.addEventListener("timeupdate", () => {
        const tiempoActual = cancionActive.currentTime;
        duracionCancion.innerText = `${formatTime(tiempoActual)} / ${formatTime(cancionActive.duration)}`;
        barraDuracion.value = cancionActive.currentTime;
    });
}



function formatTime(seconds) {
    const minutos = Math.floor(seconds / 60);
    const segundos = Math.floor(seconds % 60);
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
}

barraDuracion.addEventListener("input", () => {

    cancionActive.currentTime = barraDuracion.value;
});

