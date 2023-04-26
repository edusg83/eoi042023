(function() {

    var boton = document.getElementById("boton");

    boton.onclick = function() {
        var formulario = document.forms.miFormulario;
        var nombre = formulario.nombre;
        var correo = formulario.correo;
        var seleccion = formulario.seleccion;

        if (nombre.value.length <= 20 &&  nombre.value === "ANTONIO" ) {
            if(correo.value != "" && seleccion.value != "") {

                var nombreElement = document.createElement("p");
                nombreElement.innerHTML = nombre.value;
                seccion.appendChild(nombreElement);

                var correoElement = document.createElement("p");
                correoElement.innerHTML = correo.value;
                seccion.appendChild(correoElement);

                var seleccionElement = document.createElement("p");
                seleccionElement.innerHTML = seleccion.value;
                seccion.appendChild(seleccionElement);
            }
        } else {
            var Error = document.createElement("p");
            Error.innerHTML = "Los datos del formulario no son correctos";
            seccion.appendChild(Error);
        }
   
    }

}());