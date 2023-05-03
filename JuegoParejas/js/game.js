const mapaImagenes = new Map();

mapaImagenes.set('ace.webp', 1);
mapaImagenes.set('brook.webp', 2);
mapaImagenes.set('chopper.webp', 3);
mapaImagenes.set('franky.webp', 4);
mapaImagenes.set('jimbe.webp', 5);
mapaImagenes.set('luffy.webp', 6);
mapaImagenes.set('nami.webp', 7);
mapaImagenes.set('nico.webp', 8);
mapaImagenes.set('sanji.webp', 9);
mapaImagenes.set('usopp.webp', 10);
mapaImagenes.set('yamato.webp', 11);
mapaImagenes.set('zoro.webp', 12);


let arrayAleatorios = [24]


map1.set('a', 1);
function clickImagen() {

    random();

    console.log("Mostrando el array...")

    for (let i = 0; i < 24; i++) {
        console.log("[" + i + "]" + arrayAleatorios[i]);
    }

}

function random() {

    var n = 24; 
        
    while (n > 0) {

        var numero = Math.floor((Math.random() * (24 - 1 + 1)) + 1);
        console.log("Numero: " + numero)
        if (n === 24){
            arrayAleatorios[24 - n] = numero;
            console.log("Añadido primer numero")
            n--;
        } else {
            if (!arrayAleatorios.includes(numero)){
                arrayAleatorios[24 - n] = numero;
                console.log("Numero no repetido")
                n--;
            } else {
                console.log("Numero repetido")
            }
        }
    }   
}

function cambiarImagen() {

    for (let i = 0; i < 24; i++) {

    }


    var indiceImagen = document.getElementById("1");

    

}
