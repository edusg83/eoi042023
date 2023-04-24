var cadena1 = "CADENA1",
    cadena2;

console.log(cadena1.valueOf());

if (cadena2 === undefined)
   console.log("SIN DEFINIR");

var cliente = {
    nombre : "PEPITO",
    tel : "656666666"
}

cliente["direccion"] = "C/ Salud,21"

for (var propiedad in cliente){
    console.log(cliente[propiedad]);
}
