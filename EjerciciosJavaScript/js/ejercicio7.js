pieza1 = {
    peso : 20,
}

pieza2 = {
    peso : "20",
}

console.log(pieza1.peso == pieza2.peso);

console.log(pieza1.peso === pieza2.peso);

var resultado = pieza1.peso == "20" ? pieza1.peso + pieza2.peso : pieza1.peso * pieza2.peso;

console.log(resultado);