var boton1 = document.getElementById("boton1");
var p1 = document.getElementById("p1");
boton1.onclick = function() {
	if (p1.classList.contains("parrafo")) {
		p1.classList.remove("parrafo");
		boton1.innerHTML = "Aplicar estilo a párrafo";
		boton1.classList.remove("aplicado");
	} else {
		p1.classList.add("parrafo");
		boton1.innerHTML = "Quitar estilo a párrafo";
		boton1.classList.add("aplicado");
	}
};