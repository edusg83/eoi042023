let visorOperacion=0000;
let visorValor=null
let param1;
let param2;
let operacion;

function boton(dato){
    let aux=document.getElementById("visorValor");
}

//division
function dividir (param1, param2){
    return param1/param2;
};

//multiplicacion
function multiplicar (param1, param2){
    return param1*param2;
};

//resta
function restar (param1, param2){
    return param1-param2;
};

//suma
function sumar (param1, param2){
    return param1+param2;
};

//igual
function resultado(){
    switch(operacion){
        case dividir:
            console.log(dividir());
            break;
        case multiplicar:
            console.log(multiplicar());
            break;
        case restar:
            console.log(restar());
            break;
        case sumar:
            console.log(sumar());
            break;
    }
}

console.log(dividir(4,2)+resultado);

//decimal