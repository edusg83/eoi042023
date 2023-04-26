var boton = document.getElementById("boton1");
var parrafo = document.getElementById("p1");

boton.onclick = function() {
	if (parrafo.classList.contains("parrafo")) {
		parrafo.classList.remove("parrafo");
		boton.innerHTML = "Aplicar estilo a párrafo";
		boton.classList.remove("aplicado");
	} else {
		parrafo.classList.add("parrafo");
		boton.innerHTML = "Quitar estilo a párrafo";
		boton.classList.add("aplicado");
	}
};
