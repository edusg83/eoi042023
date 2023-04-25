funciones = {
    colorVerde: function() {
        console.log("VERDE");
    },

    colorRojo: function() {
        console.log("ROJO");
    }
}

funciones.colorRojo = funciones.colorVerde;
funciones.colorRojo();

