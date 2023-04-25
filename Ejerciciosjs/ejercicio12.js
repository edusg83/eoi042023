var objeto = {
    nombre: "Pepito",
    saludo_fn: function() {
        console.log("Hola, mi nombre es " + this.nombre);
    }
};
objeto.saludo_fn();