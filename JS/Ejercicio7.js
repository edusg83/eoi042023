var pieza1 = {peso: 20};
var pieza2 = {peso: '20'};
var consoleDiv = document.getElementById("console");

console.log(pieza1.peso == pieza2.peso);
console.log(pieza1.peso === pieza2.peso);

var resultado = pieza1.peso === 20 ? pieza1.peso + parseInt(pieza2.peso) : pieza1.peso * parseInt(pieza2.peso);
console.log(resultado);
