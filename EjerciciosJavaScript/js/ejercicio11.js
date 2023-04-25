funciones = {
    verde: function colorVerde() {
        console.log("VERDE");
    },

    rojo: function colorRojo() {
        this.verde();
        console.log("ROJO");
    }
}

funciones.rojo();

