var cadena1 = "CADENA1";
var cadena2;
console.log(typeof(cadena1));
console.log(typeof(cadena2));

if(cadena2 == undefined){
    console.log("SIN DEFINIR");
}

var cliente = {
    nombre:'PEPITO', 
    tel:'656666666'    
};
cliente.direccion = "C/ Salud,21";
console.log(cliente);
console.log(cliente.nombre);
console.log(cliente.tel);
console.log(cliente.direccion);