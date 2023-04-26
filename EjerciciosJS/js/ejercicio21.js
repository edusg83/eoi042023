
(function() {
    var elem = document.createElement("p");
    elem.setAttribute("id","p1")
    elem.innerHTML = "Parrafo1";
    document.body.appendChild(elem);
}());


(function() {
    var elem = document.createElement("button");
    elem.setAttribute("id","boton1")
    elem.innerHTML = "Aplicar estilo a parrafo";
    let pElem = document.getElementById("p1")
    pElem.appendChild(elem);
}());


let parrafoElem = document.getElementById("p1")
let botonElem = document.getElementById("boton1")

botonElem.onclick = function(){
    if(parrafoElem.className == "" ){
        parrafoElem.classList.add("parrafo")
        parrafoElem.classList.add("aplicado")
        
        botonElem.innerHTML = "Quitar estilo al parrafo"
    }else{
        parrafoElem.className = ""
        botonElem.innerHTML = "Aplicar estilo a parrafo"
    }
}