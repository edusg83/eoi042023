(function() {
    
    var parrafo = document.createElement("p");
    parrafo.innerHTML = "Parrafo1";
    document.body.appendChild(parrafo);
    parrafo.id = "p1";

    var boton = document.createElement("button");
    boton.innerHTML = "Aplicar estilo a párrafo";
    parrafo.appendChild(boton);


    boton.onclick = function() {
        var parrafo = document.getElementById("p1");

        if (parrafo.classList.contains("parrafo")) {
            parrafo.classList.remove("parrafo")
            boton.innerHTML = "Aplicar estilo a párrafo";
            parrafo.classList.remove("aplicado")
        } else {
            parrafo.classList.add("parrafo")
            boton.innerHTML = "Quitar estilo a parrafo";
            parrafo.classList.add("aplicado")
        }
   
    }

}());