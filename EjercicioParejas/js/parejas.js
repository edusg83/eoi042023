const numFilas = 4;
const numColumnas = 6;

let nombreJugador1 = ''
let nombreJugador2 = ''

let botonAnimal = new Map()
let animalesAsignados = new Array()

const modalInicio = new bootstrap.Modal(document.getElementById("modalJugadores"))

//Inicia el modal de bienvenida
modalInicio.show();
restablecerTablero();

//carga los datos de juego
function cargarPartida(){
    
    nombreJugador1 = document.getElementById("entradaNombreJugador1").value.toUpperCase()
    nombreJugador2 = document.getElementById("entradaNombreJugador2").value.toUpperCase()
    
    if(nombreJugador1.length >0 && nombreJugador2.length >0){
        modalInicio.hide();
        document.getElementById("rotuloJugador").innerText = nombreJugador1 
        document.getElementById("tarjetaJug1").innerText = nombreJugador1
        document.getElementById("tarjetaJug2").innerText = nombreJugador2 
        document.getElementById("jug2").style.opacity = 0.4
    }
}

//reinicia el tablero y asigna a los botones nuevos animales
function restablecerTablero() {

    let boton = "";
    contador = 1;

    for (let i = 0; i < numFilas; i++) {

        for (let j = 0; j < numColumnas; j++) {
            boton += `
            <div class="col-2">
                <button class="btn btn-link" id="boton${contador}" onclick="revelarCarta(boton${contador})">
                    <img src="../image/carta.png" width="110px" height="110px"  />
                </button> </div> `

            botonAnimal.set(("boton"+contador++),darAleatorioLibre())
        }
    }
    document.getElementById("tablero").innerHTML += `<div class=" g-0 row p-1">` + boton + `</div>`
}

//se devuelve un aleatorio disponible
function darAleatorioLibre() {

    let aleatorio = Math.floor(Math.random() * 12) + 1;

    if(!estaDosVeces(aleatorio,animalesAsignados)){
        animalesAsignados.push(aleatorio);
        return aleatorio;
    }else{
        return darAleatorioLibre();
    }
}

//comprueba si un elemento está dos veces en un array
function estaDosVeces(elemento, lista) {
    var primerIndice = lista.indexOf(elemento);
    return lista.indexOf(elemento, primerIndice + 1) !== -1;
}

//muestra el animal asignado y comprueba que no se pulse el mismo
let numeroCartasLevantadas = 0;
let cartasLevantadas = new Array();
let cartaTapada = `<img src="../image/carta.png" width="110px" height="110px"/>`

function revelarCarta(boton) {
    document.getElementById(boton.id).innerHTML= `<img src="../image/${botonAnimal.get(boton.id)}.png" width="110px" height="110px"  />`
   
    if(cartasLevantadas.indexOf(boton.id)){
        numeroCartasLevantadas++;
        cartasLevantadas.push(boton.id)

        if(numeroCartasLevantadas == 2){
            comprobarAcierto()
            
        }else if(numeroCartasLevantadas == 3){
            document.getElementById(cartasLevantadas[0]).innerHTML= cartaTapada
            document.getElementById(cartasLevantadas[1]).innerHTML= cartaTapada
            
            cartasLevantadas=[]
            numeroCartasLevantadas = 1;
            cartasLevantadas.push(boton.id)
        }
    } 
}

//comprueba el acierto y desabilita los botones acertados
let puntuacionMarcador1 = 0;
let puntuacionMarcador2 = 0;
let turno1 = true; 

function comprobarAcierto(){

    if(botonAnimal.get(cartasLevantadas[0])== botonAnimal.get(cartasLevantadas[1])){
        document.getElementById(cartasLevantadas[0]).setAttribute("disabled", "true")
        document.getElementById(cartasLevantadas[1]).setAttribute("disabled", "true")
        
        sumarAcierto(botonAnimal.get(cartasLevantadas[0])); 
        numeroCartasLevantadas = 0;
        cartasLevantadas=[] 
        if((puntuacionMarcador1+puntuacionMarcador2)==12){
            obtenerResultados();
        }
    }else{
        cambioJugador();
    }
}

//cambia el booleano del turno
function cambioJugador(){

    turno1 = (turno1 == true)? false: true;    
    document.getElementById("rotuloJugador").innerText = (turno1)? nombreJugador1 : nombreJugador2
    
    if(turno1){
        document.getElementById("jug1").style.opacity = 1
        document.getElementById("jug2").style.opacity = 0.4
    }else{
        document.getElementById("jug1").style.opacity = 0.4
        document.getElementById("jug2").style.opacity = 1
    }
}

//suma uno a la puntuación en función de l booleano turno1
function sumarAcierto(imagen){

    (turno1)? document.getElementById("puntuacionJug1").innerText = ++puntuacionMarcador1
            : document.getElementById("puntuacionJug2").innerText  = ++puntuacionMarcador2;

    (turno1)?document.getElementById("cuerpoTarjetaJugador1").innerHTML +=`
        <img src="../image/${imagen}.png" class="p-1" width="50px" style="background-color: aliceblue;"> `:
        document.getElementById("cuerpoTarjetaJugador2").innerHTML +=`
        <img src="../image/${imagen}.png" class="p-1" width="50px" style="background-color: aliceblue;"> `
    };              

//muestra el modal victoria con los datos de la partida
const modalVictoria = new bootstrap.Modal(document.getElementById("modalVictoria"))

function obtenerResultados (){
    modalVictoria.show();
    document.getElementById("jugVictoria1").innerText = nombreJugador1
    document.getElementById("jugVictoria2").innerText = nombreJugador2
    document.getElementById("puntosVictoria1").innerText = puntuacionMarcador1
    document.getElementById("puntosVictoria2").innerText = puntuacionMarcador2

    if(puntuacionMarcador1 == puntuacionMarcador2){
        document.getElementById("imagenModalVictoria").innerHTML =`<img  src="../image/empate.png" class="me-3" width="200px"></img>`
        
        document.getElementById("mensajeModalVictoria").innerHTML = `<b>¡HABÉIS EMPATADO!</b>`
        
    }else{
        document.getElementById("imagenModalVictoria").innerHTML =`<img  src="../image/trofeo.png" class="me-3" width="200px"></img>`
        document.getElementById("ganador").innerText = (puntuacionMarcador1 > puntuacionMarcador2)? nombreJugador1:nombreJugador2
    }
}

function cerrarModalVictoria(){
    modalVictoria.hide();
}











