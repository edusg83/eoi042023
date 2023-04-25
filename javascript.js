let nombre="Pepe";

let obj={
    nombre:"Paco",
    saludo: function(){
        console.log("hola "+ this.nombre);
    }
}

let maria ={
    nombre:"María"
}

maria.saludo=obj.saludo;
maria.saludo();