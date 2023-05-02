const headers = {
    'content-Type': 'applecation/json',
    'Access-Control-Allow-Origin': '*'
};

let pagina = 0;
let tamanyo = 10;

//funciones de paginado de los resultados
function paginaSiguiente(){
    pagina += 1;
    obtenerHitos();
    document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
}

function paginaPrevia(){
    if (pagina > 0) {
        pagina -= 1;
        obtenerHitos();
        document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
    }
}

function paginar(){
    tamanyo = document.getElementById("paginador").value;
    obtenerHitos();
}

//creación del listado de hitos de la bd
function obtenerHitos() {
    const urlUsers = 'http://ligafalm.eu:28100/milestones?page='+pagina+'&size='+tamanyo;
    document.getElementById("contenidoTabla").innerHTML = ``
    axios.get(urlUsers, { headers })
        .then((respuesta) => {

            respuesta.data.forEach(element => {

                let filasContenido = `<tr>
                <td >${element.name}</td>
                <td >${element.start.split('T')[0]}</td>
                <td >${element.end.split('T')[0]}</td>
                <td >${element.progress}</td>
                <td class="d-flex justify-content-end">
                    <button type="button" class="btn ms-0 ps-0">
                    <img src="../image/search.svg" alt="boton de buscar" width="20px"/>
                    </button>
                    <button type="button" class="btn ms-0 ps-0" data-bs-toggle="modal"
                        data-bs-target="#detallesModal" onclick="actualizarModalProducto(${element.id})">
                        <img src="../image/pencil.svg" alt="botod de añadir" width="20px"/>
                    </button>
                    <button type="button" class="btn ms-0 ps-0" data-bs-toggle="modal"
                        data-bs-target="#modalBorrar" onclick="actualizarModalBorrar(${element.id})">
                        <img src="../image/trash.svg" alt="botod de añadir" width="20px" />
                    </button></td></tr>`
                    document.getElementById("contenidoTabla").innerHTML += filasContenido;
            });
        })
}
//obtención de los hitos cuando se carga la página
obtenerHitos();

//limpiar campos del modal detalles
function limpiarModalDetalles(){
    document.getElementById("nombreHito").value =""
    document.getElementById("FechaFinal").value =""
    document.getElementById("FechaInicio").value =""
    document.getElementById("FechaInicio").value =""
    document.getElementById("descripcionModalDetalles").innerHTML = `Añade un nuevo hito a la base de datos`
    document.getElementById("tituloModalDetalles").innerText = "Crear un hito" 
    document.getElementById("casillasExtraActualizar").innerHTML =`<div class="form-group mb-3 d-flex mt-3">
    <label for="nombreHito" id="etiquetaNombreHito" class="me-4 pe-2">Nombre: </label>
    <input type="text" class="form-control form-control-sm ms-2 " id="nombreHito"></div>`
    document.getElementById("guardarModalDetalles").onclick = function(){ guardarHito();}

}

//guarda la transacción
function guardarHito(){

    fechaInicio = document.getElementById("FechaInicio").value;
    fechaFinal = document.getElementById("FechaFinal").value;
    nombre = document.getElementById("nombreHito").value;

    let validarOrcenFechas= ((new Date(fechaInicio)) < (new Date(fechaFinal)))? true : false;
   
    if(nombre.length > 0  && validarOrcenFechas){
        const url = 'http://ligafalm.eu:28100/milestones';
        axios.post(url, {
            "name": nombre,
            "start": fechaInicio,
            "end": fechaFinal
        })
            .then((respuesta) => {
                if (respuesta.status == 200) {
                        document.getElementById("alertaExito").innerHTML = `
                            <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                            ¡Se ha creado el hito con éxito!</div>`
                }
                obtenerHitos();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
                document.getElementById("descripcionModalDetalles").innerHTML = "Añade un nuevo hito a la base de datos"
            })
    } else {
        if(nombre.length <= 0){
        document.getElementById("descripcionModalDetalles").innerHTML = `
            <div id="alertaDetalles" class="alert alert-danger" role="alert">
            Todos los campos deben estar rellenos correctamente</div>`
        }else{
            document.getElementById("descripcionModalDetalles").innerHTML = `
            <div id="alertaDetalles" class="alert alert-danger" role="alert">
            Las fechas no son correctas, comprueba que la final sea mayor que la inicial</div>`
        }
    }
}

//mostrar los datos de la transacción que se quiere borrar
function actualizarModalBorrar(idHito){

    const urlUsers = 'http://ligafalm.eu:28100/milestones/' + idHito;
    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            document.getElementById("contenidoTablaModalBorrar").innerHTML = ""
            let cardTabla = `
            <tr>
                <td id="idModalBorrar">${respuesta.data.id}</td>
                <td>${respuesta.data.name}</td>
                <td>${respuesta.data.start}</td>
                <td>${respuesta.data.end}</td>
                <td>${respuesta.data.progress}</td>
            </tr> `
            document.getElementById("contenidoTablaModalBorrar").innerHTML += cardTabla
    })
}

//Se borra la entrada de la bd que se mostraba en el modal #modalBorrar
function borrarEntrada(){
    id = document.getElementById("idModalBorrar").innerText;

    const url = 'http://ligafalm.eu:28100/milestones/' + id
    axios.delete(url, { headers })
        .then((respuesta) => {
            if (respuesta.status == 204) {
                document.getElementById("alertaExito").innerHTML = `
                    <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                    ¡Se ha borrado la entrada con éxito!</div>`
            }
            obtenerHitos();
        })
}

function actualizarModalProducto(idHito){
    fechaInicio = document.getElementById("FechaInicio");
    fechaFinal = document.getElementById("FechaFinal");
    cuerpoModal = document.getElementById("casillasExtraActualizar");
    
    const url = 'http://ligafalm.eu:28100/milestones/' + idHito;

    axios.get(url, { headers })
        .then((respuesta) => {
            fechaInicio.value = (respuesta.data.start).substring(0,16)
            fechaFinal.value = (respuesta.data.end).substring(0,16)

            cuerpoModal.innerHTML = `
            <div class="d-flex flex-lg-row flex-sm-column mt-4">
            <div class="form-group d-flex" >
                <label for="nombreHito" id="etiquetaNombreHito" class="me-3 pe-3">Nombre: </label>
                <input type="text" class="form-control form-control-sm ms-2 me-5" id="nombreHito" value="${respuesta.data.name}">
            </div>
            <div class="form-group d-flex">
                <label for="progresoHito" id="etiquetaProgresoHito" class=" me-4">Progreso: </label>
                <input type="number" class="form-control form-control-sm" id="progresoHito" value="${respuesta.data.progress}">
            </div></div>`

            document.getElementById("tituloModalDetalles").innerText = "Modificar un hito" 
            document.getElementById("descripcionModalDetalles").innerHTML = `Modifica los datos del hito seleccionado:`
            document.getElementById("guardarModalDetalles").onclick = function(){ actualizarHito(respuesta.data.id);}
            document.getElementById("guardarModalDetalles").innerText = "Actualizar"
        })
}

function actualizarHito(idHito){
    
    fechaInicio = document.getElementById("FechaInicio").value;
    fechaFinal = document.getElementById("FechaFinal").value;
    nombre = document.getElementById("nombreHito").value;
    progreso = document.getElementById("progresoHito").value

    let validarOrcenFechas= ((new Date(fechaInicio)) < (new Date(fechaFinal)))? true : false;

    if(validarOrcenFechas && nombre.length > 0  && progreso >=0){

        axios.put('http://ligafalm.eu:28100/milestones/' + idHito, {
            
            "id": idHito,
            "name": nombre,
            "start": fechaInicio,
            "end": fechaFinal,
            "progress": progreso

            }).then(response => {
                if (response.status == 202) {
                    document.getElementById("alertaExito").innerHTML = `
                <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                ¡Se ha actualizado el hito con éxito!</div>`
                }
                obtenerHitos();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
            })
    }else{
    if(nombre.length <= 0 || progreso < 0){
        document.getElementById("descripcionModalDetalles").innerHTML = `
            <div id="alertaDetalles" class="alert alert-danger" role="alert">
            Todos los campos deben estar rellenos correctamente</div>`
        }else{
            document.getElementById("descripcionModalDetalles").innerHTML = `
            <div id="alertaDetalles" class="alert alert-danger" role="alert">
            Las fechas no son correctas, comprueba que la final sea mayor que la inicial</div>`
        }
    }
}

