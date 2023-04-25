funciones = {
    verde: function colorVerde() {
        console.log("VERDE");
    },

    rojo: function colorRojo() {
        funciones.verde();
        console.log("ROJO");
    }
}

funciones.rojo();

