const numFilas = 4;
const numColumnas = 6;

//reinicia el tablero y asigna a los botones nuevos animales
function restablecerTablero() {

    let boton = "";

    for (let i = 0; i < numFilas; i++) {

        for (let j = 0; j < numColumnas; j++) {
            boton += `
            <div class="col-2">
                <button class="btn btn-link">
                    <img src="../image/carta.png" width="110px" height="110px"  />
                </button> </div> `

        }
    }
    document.getElementById("tablero").innerHTML += `<div class=" g-0 row p-1">` + boton + `</div>`
}

//carga el tablero al iniciar la página
restablecerTablero();









