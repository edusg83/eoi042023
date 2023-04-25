function suma(param1, param2) {
    return param1 + param2;
}
console.log("Resultado de la suma con la función 'suma':", suma(12, 12));
(function(param1, param2) {
    console.log("Resultado de la suma con la función anónima auto-ejecutable:", param1 + param2);
})(12, 12);
