(function() {
    
    let elem = document.createElement("p");

    elem.innerHTML = "Este texto está añadido dinámicamente";
    elem.setAttribute("id","parrafo1")
    document.body.appendChild(elem);

   
}());

