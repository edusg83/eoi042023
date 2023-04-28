let enviar = document.getElementById("enviar"),
    nombre = document.getElementById("nombre"),
    email = document.getElementById("email"),
    error = document.getElementById("panelError"),
    provincia = document.getElementById("provincia");


nombre.addEventListener("keypress", function (evt) {
    error.innerHTML = ""
});

email.addEventListener("keypress", function (evt) {
    error.innerHTML = ""
});

provincia.addEventListener("change", function (evt) {
    error.innerHTML = ""
});


enviar.onclick = function () {

    if (nombre.value.length > 20 || email.value == "" || nombre.value.length <= 0) {
        error.innerHTML = "Los datos del formulario no son correctos"
    } else {
        let mostrarNombre = document.getElementById("mostrarNombre"),
            mostrarEmail = document.getElementById("mostrarEmail"),
            mostrarProvincia = document.getElementById("mostrarProvincia");
        mostrarNombre.innerHTML ="Nombre: "+ nombre.value
        mostrarEmail.innerHTML = "Email: "+ email.value
        mostrarProvincia.innerHTML = "Provincia: "+ provincia.value
    }
}
