var array1 = [1, 2, 3, 4];
var consoleDiv = document.getElementById("console");

for (let numero of array1) {
  switch (numero) {
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
      console.log("No se reconoce el número");
      break;
  }
}

array1.push(3);
console.log(array1);

array1.splice(-3);
console.log(array1);
