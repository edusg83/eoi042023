var cadena1 = "CADENA1";
console.log(cadena1);
var cadena2;
console.log(cadena2);
console.log(typeof cadena1);
console.log(typeof cadena2);
if (typeof cadena2 === "undefined") {
  console.log("SIN DEFINIR");
}
var cliente = {
  nombre: "PEPITO",
  tel: "656666666"
};
console.log(cliente);
cliente.direccion = "C/ Salud,21";
console.log(cliente);
for (var propiedad in cliente) {
  console.log(propiedad + ": " + cliente[propiedad]);
}
