var funciones={
    colorVerde : function(){ console.log("VERDE");},
    colorRojo : function(){
        console.log("ROJO");
        this.colorVerde()}
}

funciones.colorRojo();