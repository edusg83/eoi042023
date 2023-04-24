var numero = [1, 2, 3, 4];
for (var i = 0; i < numero.length; i++) {
    var n = numero[i];

    switch (n) {
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
    }
}

numero[numero.length] = 3;

console.log(numero);

numero.pop();
numero.pop();
numero.pop();

console.log(numero);
