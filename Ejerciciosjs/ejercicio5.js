const array1 = [1, 2, 3, 4];
console.log("a) El array1 es:", array1);
console.log("b) Los elementos del array1 son:");
array1.forEach((element) => {
  switch (element) {
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
      console.log("Elemento desconocido");
  }
});
array1.push(3);
console.log("c) El array1 con el elemento 3 al final es:", array1);
array1.splice(-3);
console.log("d) El array1 con los últimos 3 elementos eliminados es:", array1);
