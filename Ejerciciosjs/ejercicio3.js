var cadena1 = "CADENA1";
console.log("La cadena1 es: " + cadena1);

var posicion = cadena1.indexOf("ENA");
console.log("La posición del texto 'ENA' en cadena1 es: " + posicion);

var ultimoCaracter = cadena1.charAt(cadena1.length-1);
console.log("El último carácter de cadena1 es: " + ultimoCaracter);

var cadenaMinusculas = cadena1.toLowerCase();
console.log("La cadena1 en minúsculas es: " + cadenaMinusculas);

var nuevaCadena = cadena1.replace("DE", "ME");
console.log("La nueva cadena1 es: " + nuevaCadena);

var cadena2 = "CADENA2";
console.log("La cadena2 es: " + cadena2);

var concatenacion = cadena2.concat(cadena1);
console.log("La concatenación de cadena1 y cadena2 es: " + concatenacion);