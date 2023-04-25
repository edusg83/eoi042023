function sumardorDias (fecha, meses) {

    var Array = fecha.split("-");

    var MesNuevo = Number(Array[1]) + meses;

    if (Number(MesNuevo) > 12)
        MesNuevo = Number(MesNuevo) - 12;
        Anio = Number(Array[2]) + 1;
        Array[2] = Anio;
    
    Array[1] = MesNuevo;

    return Array[2]+"-"+Array[1]+"-"+Array[0];

}

console.log(sumardorDias("19-07-2022", 8));
