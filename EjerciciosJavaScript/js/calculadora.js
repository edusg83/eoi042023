function suma(op1, op2) {
    
    var resultado = op1 + op2;

    return resultado;
}

function resta(op1, op2) {

    var resultado = op1 - op2;

    if (resultado < 0)
        return resultado = 0;
    else
        return resultado; 
}

function multiplicacion(op1, op2) {
    
    var resultado = op1 * op2;

    return resultado;
}

function division(op1, op2) {
    
    if (op2 == 0)
        return "Divisior igual a 0";

    var resultado = op1 / op2;

    return resultado;
}

console.log(suma(1, 5));
console.log(resta(1, 5));
console.log(resta(5,3))
console.log(multiplicacion(3,4))
console.log(division(5,0))
console.log(division(10,2))

