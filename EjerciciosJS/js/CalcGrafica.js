let pantalla = "",
    memoria = "",
    operador = "",
    finOperacion = false,
    elementoPantalla = document.getElementById("pantalla");

function anyadirNumero(num) {

    pantalla += num
    elementoPantalla.innerHTML = pantalla
}

function operar(op) {

    if (memoria === "") {
        operador = op;
        memoria = pantalla;
        pantalla = ""
        elementoPantalla.innerHTML = operador
    } 
}

function calcular() {

    let calculo = (Number(memoria)<0 && operador === "-")? eval(pantalla +memoria): eval( memoria+ operador +pantalla)
    elementoPantalla.innerHTML = calculo
    memoria = "";
    pantalla = "";
}

function negativo(){
    
    if(pantalla ===""){
        anyadirNumero("-")
    }else if(pantalla !="" && memoria === ""){
        operar("-")
    }  
}