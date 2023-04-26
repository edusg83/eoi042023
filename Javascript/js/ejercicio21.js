(function(){
    let doc=document,

    nElem=doc.createElement("p"),
    attr=doc.createAttribute("id", "p1"),
    content=doc.createTextNode("Párrafo1");
   
    doc.body.appendChild(nElem);
}

)

(function(){
    let doc=document,

    nElem=doc.createElement("button"),
    attr=doc.createAttribute("id", "boton1"),
    content=doc.createTextNode("Aplicar estilo a párrafo"),
    local=doc.getElementById("p1");
    
    doc.local.appendChild(nElem);
})

let elm=document.getElementById("boton1");

elm.onclick=function(){
    let doc=document,
    
    this.doc.createAttribute("class", "parrafo"),
    
}

