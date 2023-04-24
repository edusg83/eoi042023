
var array1 = [1, 2, 3, 4];

for (var i = 0; i < array1.length; i++) {
    switch (array1[i]) {
        case 1:
            console.log("UNO");
            break;
        case 2:
            console.log("DOS");
            break;
        case 3:
            console.log("TRES");
            break;
        case 4:
            console.log("CUATRO");
            break;
        default:
            console.log("Número no válido");
            break;
    }
}

array1.push(3);
console.log("Array con el número 3 añadido: " + array1);

array1.splice(-3, 3);
console.log("Array sin los últimos 3 elementos: " + array1);