const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlObjetivos = 'http://ligafalm.eu:28100/goals?page=0&size=100';

axios.get(urlObjetivos, {headers})
.then((respuesta) => {
    
    let arrayData = respuesta.data;

    let tabla = `<table id="dataTable" class="table table-bordered dataTable text-center">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Asignación</th>
            <th>Progreso</th>
            <th>Nº Transacciones</th>
            <th>Opciones</th>
        </tr>
    </thead>
    <tbody>`;

    let finTabla = `</tbody>
                    </table>`;

    let filas = ``;

    arrayData.forEach(element => {
        
        filas += `
        <tr>
            <td class="col-2">${element.name}</td>
            <td class="col-2">${element.description}</td>
            <td class="col-2">${element.assignedTo}</td>
            <td class="col-2">${element.progress}</td>
            <td class="col-2">${element.transactions.length}</td>
            <td class="col-2">
                <button data-bs-toggle="modal" data-bs-target="#modalBorrar" onclick="previoBorrar(${element.id})" class="btn btn-primary btn-circle">
                    <i class="bi bi-trash"></i>
                </button>
                <button data-bs-toggle="modal" data-bs-target="#modalModificar" onclick="previoModificar(${element.id})" class="btn btn-primary btn-circle">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>`
    })

    tabla += filas + finTabla;
    document.getElementById("resultados").innerHTML = tabla;

}).catch((error)=>{console.log(error)});

let idObjetivo = 0;

function previoBorrar (id) {
    idObjetivo = id;
}

function borrarObjetivo() {

    axios.delete('http://ligafalm.eu:28100/goals/' + idObjetivo)
    .then((respuesta)=>{

        console.log(respuesta.data);
        window.location.assign('objetivos.html');

    }).catch((error)=>{console.log(error)});

}

function previoCrear () {

    axios.get('http://ligafalm.eu:28100/users?page=0&size=100', {headers})
    .then((respuestaUsuarios) => {

        let arrayUsuarios = respuestaUsuarios.data;

        let optionUsuarios = ``;

        arrayUsuarios.forEach(usuario => {
            
            optionUsuarios += `<option value="${usuario.id}">${usuario.username}</option>`
        
        });

        document.getElementById("selectAssignedTo").innerHTML = optionUsuarios;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/milestones?page=0&size=100', {headers})
    .then((respuestaHitos) => {

        let arrayHitos = respuestaHitos.data;

        let optionHitos = ``;

        arrayHitos.forEach(hito => {

            optionHitos += `<option value="${hito.id}">${hito.name}</option>`
        
        });

        document.getElementById("selectMilestone").innerHTML = optionHitos;

    }).catch((error)=>{console.log(error)});

}

function crearObjetivo() {

    var formulario = document.forms.formCrearObjetivo;

    const dataRequestObjetivo = {
        "name": formulario.nameObjetivo.value,
        "description": formulario.descriptionObjetivo.value,
        "assignedTo": formulario.selectAssignedTo.value,
        "progress": 0
    }

    axios.post("http://ligafalm.eu:28100/goals/", dataRequestObjetivo, {headers})
    .then((respuestaObjetivo)=>{

        console.log(respuestaObjetivo.data);

        const dataRequestHito = {
            "idMilestone": formulario.selectMilestone.value,
            "goals": [respuestaObjetivo.data]
        }

        
        axios.put("http://ligafalm.eu:28100/goals/milestone/" + formulario.selectMilestone.value, dataRequestHito, {headers})
        .then((respuestaHito)=>{

            console.log(respuestaHito.data);
            window.location.assign('objetivos.html');

        }).catch((error)=>{console.log(error)});

    }).catch((error)=>{console.log(error)});
}

function previoModificar (id) {

    idObjetivo = id;
    var formulario = document.forms.formModificarObjetivo;
    var arrayObjetivo;

    axios.get('http://ligafalm.eu:28100/users?page=0&size=100', {headers})
    .then((respuestaUsuarios) => {

        let arrayUsuarios = respuestaUsuarios.data;
        let optionUsuarios = ``;

        arrayUsuarios.forEach(usuario => {
            optionUsuarios += `<option value="${usuario.username}">${usuario.username}</option>`;

        })

        document.getElementById("selectModAssignedTo").innerHTML = optionUsuarios;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/goals/' + idObjetivo, {headers})
    .then((respuestaObjetivo) => {

        arrayObjetivo = respuestaObjetivo.data;
        
        formulario.nameModObjetivo.value = arrayObjetivo.name;
        formulario.descriptionModObjetivo.value = arrayObjetivo.description;
        formulario.selectModAssignedTo.value = arrayObjetivo.assignedTo;
        formulario.progressModObjetivo.value = arrayObjetivo.progress;
    
    }).catch((error)=>{console.log(error)});

}

function modificarObjetivo () {
    var formulario = document.forms.formModificarObjetivo;

    const dataRequest = {
        "id": idObjetivo,
        "name": formulario.nameModObjetivo.value,
        "description": formulario.descriptionModObjetivo.value,
        "assignedTo": formulario.selectModAssignedTo.value,
        "progress": formulario.progressModObjetivo.value
    }

    axios.put('http://ligafalm.eu:28100/goals/' + idObjetivo, dataRequest, {headers})
    .then((respuesta)=>{
        console.log(respuesta.data);
        window.location.assign('objetivos.html');
    })
    .catch((error)=>{console.log(error)});
}

