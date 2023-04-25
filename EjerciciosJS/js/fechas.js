function sumarMes (fecha, meses){

    var dias = fecha.substring(0,2)
    var mes = fecha.substring(3,5)
    var anyo = fecha.substring(6,10)

    var sumaMeses = (Number(mes)+meses)
    var sumaAnyo = Number((sumaMeses/12).toFixed()) + Number(anyo)
    var mesFinal = sumaMeses%12

    return sumaAnyo+"-"+mesFinal+"-"+dias  
}

console.log(sumarMes("05/02/2000", 36))