
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
        return "Divisior igual a 0";
    else 
        return op1 / op2;
}

function addOperador(boton) {

    if (operadores[1] === undefined) {
        operadores[1] = Number(boton.value)
    } else if (operadores[2] === undefined) {
        operadores[2] = Number(boton.value)
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
            resultado = getSuma(operadores[1], operadores[2]);
            alert(resultado);
            break;
        case "-":
            resultado = getResta(operadores[1], operadores[2]);
            alert(resultado);
            break;
        case "x":
            resultado = getMultiplicacion(operadores[1], operadores[2]);
            alert(resultado);
            break;
        case "/":
            resultado = getMultiplicacion(operadores[1], operadores[2]);
            alert(resultado);
            break;
    }
  
}

var operacion;
var operadores = [2];