function suma(num1,num2){
    return num1+num2
}

function resta(num1,num2){
    return ((num1-num2)<0)? 0 : num1-num2;
}

function multiplicacion(num1,num2){
    return num1*num2;
}

function division (num1,num2){
    return (num2 === 0) ? "No se puede dividir por 0" :  num1/num2;
}

console.log(suma(2,4));
console.log(resta(8,4));
console.log(resta(2,4));
console.log(multiplicacion(2,4));
console.log(division(2,4));
console.log(division(2,0));