function suma(op1, op2) {

    return op1 + op2;
}

function resta(op1, op2) {

    if (op1 - op2 < 0)
        return 0;
    else
        return op1 - op2; 
}

function multiplicacion(op1, op2) {

    return op1 * op2;
}

function division(op1, op2) {
    
    if (op2 == 0)
        return "Divisior igual a 0";
    else 
        return op1 / op2;
}

console.log(suma(1, 5));
console.log(resta(1, 5));
console.log(resta(5,3))
console.log(multiplicacion(3,4))
console.log(division(5,0))
console.log(division(10,2))

