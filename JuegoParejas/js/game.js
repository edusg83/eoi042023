const mapaImagenes = new Map();

mapaImagenes.set(1, 'ace.png');
mapaImagenes.set(2, 'brook.png');
mapaImagenes.set(3, 'chopper.png');
mapaImagenes.set(4, 'franky.png');
mapaImagenes.set(5, 'jimbe.png');
mapaImagenes.set(6, 'luffy.png');
mapaImagenes.set(7, 'nami.png');
mapaImagenes.set(8, 'nico.png');
mapaImagenes.set(9, 'sanji.png');
mapaImagenes.set(10, 'usopp.png');
mapaImagenes.set(11, 'yamato.png');
mapaImagenes.set(12,'zoro.png');


let arrayAleatorios = [24]


let clickUno = 0;
let clickUno_numeroAleatorio = 0;
let clickDos = 0;
let clickDos_numeroAleatorio = 0;
let turnoJugador1 = false;
let turnoJugador2 = false;

inicio();

function inicio() {

    random();

    for (let i = 0; i < 24; i++) {
        //console.log("[" + i + "]" + arrayAleatorios[i]);
        if (arrayAleatorios[i] > 12) {
            arrayAleatorios[i] = arrayAleatorios[i] - 12;
        }
        //console.log("[" + i + "]" + arrayAleatorios[i]);
    }

    console.log("Funcion inicial terminada correctamente")

}

function random() {

    var n = 24; 
        
    while (n > 0) {

        var numero = Math.floor((Math.random() * (24 - 1 + 1)) + 1);
        //console.log("Numero: " + numero)
        if (n === 24){
            arrayAleatorios[24 - n] = numero;
            //console.log("Añadido primer numero")
            n--;
        } else {
            if (!arrayAleatorios.includes(numero)){
                arrayAleatorios[24 - n] = numero;
                //console.log("Numero no repetido")
                n--;
            } else {
                //console.log("Numero repetido")
            }
        }
    }   
}

function clickImagen(image) {
    if (clickUno === 0) {

        document.getElementById(image.id).src="images/" + mapaImagenes.get(arrayAleatorios[Number(image.id - 1)]);
        clickUno = Number(image.id);
        clickUno_numeroAleatorio = arrayAleatorios[Number(image.id - 1)];
    
    } else if (clickDos === 0 && Number(image.id) !== clickUno) {

        document.getElementById(image.id).src="images/" + mapaImagenes.get(arrayAleatorios[Number(image.id -1)]);
        clickDos = Number(image.id);
        clickDos_numeroAleatorio = arrayAleatorios[Number(image.id - 1)];
        
        //Esperamos dos segundos
        setTimeout(() => {  
            
            if (clickUno_numeroAleatorio !== clickDos_numeroAleatorio) {

                document.getElementById(clickUno).src="images/FondoGris.png";
                document.getElementById(clickDos).src="images/FondoGris.png";

                //Reseteamos las variables
                clickUno = 0;
                clickDos = 0;
                clickUno_numeroAleatorio = 0;
                clickDos_numeroAleatorio = 0;
        
            } else {
                //Reseteamos las variables
                clickUno = 0;
                clickDos = 0;
                clickUno_numeroAleatorio = 0;
                clickDos_numeroAleatorio = 0;
            }
        }, 1000);

    }

    

}