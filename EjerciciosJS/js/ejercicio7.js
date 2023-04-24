var pieza1 ={
    peso:"20"}

var pieza2 ={
    peso:20}

console.log(pieza1.peso == pieza2);
console.log(pieza1.peso === pieza2);

console.log((pieza1.peso == "20") ? Number(pieza1.peso) + Number(pieza2.peso) : Number(pieza1.peso) * Number(pieza2.peso));