
function getSuma(op1, op2) { 
    return op1 + op2;
}

function getResta(op1, op2) {
    if (op1 - op2 < 0)
        return 0;
    else
        return op1 - op2; 
}

function getMultiplicacion(op1, op2) {
    return op1 * op2;
}

function getDivision(op1, op2) {
    if (op2 == 0)
        return "Error";
    else 
        return op1 / op2;
}

function addOperador(boton) {

    if (operadores[0] === undefined) {
        operadores[0] = Number(boton.value)
    } else if (operadores[1] === undefined) {
        operadores[1] = Number(boton.value)
    } else {
        alert("Ya has introducido dos operadores")
    }
}

function setOperacion(op) {
    operacion = op.value;
}

function getResultado() {

    switch(operacion){
        case "+":
            display(getSuma(operadores[0], operadores[1]));
            break;
        case "-":
            display(getResta(operadores[0], operadores[1]))
            break;
        case "x":
            display(getMultiplicacion(operadores[0], operadores[1]));
            break;
        case "/":
            display(getDivision(operadores[0], operadores[1]))
            break;
    }
  
}

function display(resultado) {
    
    operadores[0] = undefined;
    operadores[1] = undefined;

    document.getElementById('display').innerHTML = resultado;

}

function reset () {
    operadores[0] = undefined;
    operadores[1] = undefined;
    operacion = "";
    document.getElementById('display').innerHTML = "";
}

var operacion;
var operadores = [2];
operadores[0] = undefined
operadores[1] = undefined
//alert("Primer operador " + operadores[0])
//alert("Segundo operador " + operadores[1])