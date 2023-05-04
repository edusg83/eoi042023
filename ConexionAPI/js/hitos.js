const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlHitos = 'http://ligafalm.eu:28100/milestones?page=0&size=100';

axios.get(urlHitos, {headers})
.then((respuesta) => {
    
    let arrayData = respuesta.data;

    let tabla = `<table id="dataTable" class="table table-bordered dataTable text-center">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Inicio</th>
            <th>Final</th>
            <th>Progreso</th>
            <th>Opciones</th>
        </tr>
    </thead>
    <tbody>`;

    let finTabla = `</tbody>
                    </table>`;

    let filas = ``;

    arrayData.forEach(element => {

        let fechaInicio = new Date(element.start);
        let fechaFinal = new Date(element.end);

        filas += `
        <tr>
            <td class="col-3">${element.name}</td>
            <td class="col-2">${fechaInicio.toLocaleDateString("es-ES")}</td>
            <td class="col-2">${fechaFinal.toLocaleDateString("es-ES")}</td>
            <td class="col-2">${element.progress}</td>
            <td class="col-3">
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

let idHito = 0;

function previoBorrar (id) {
    idHito = id;
}

function borrarHito() {

    axios.delete('http://ligafalm.eu:28100/milestones/' + idHito)
    .then((respuesta)=>{

        console.log(respuesta.data);
        window.location.assign('hitos.html');

    }).catch((error)=>{console.log(error)});

}

function crearHito() {

    var formulario = document.forms.formCrearHito;

    const dataRequest = {
        "name": formulario.nameHito.value,
        "start": formulario.fechaInicio.value,
        "end": formulario.fechaFinal.value
    }

    axios.post("http://ligafalm.eu:28100/milestones/", dataRequest, {headers})
    .then((respuestaObjetivo)=>{

        console.log(respuestaObjetivo.data);
        window.location.assign('hitos.html');

    }).catch((error)=>{console.log(error)});
}

function previoModificar (id) {

    idHito = id;

    axios.get('http://ligafalm.eu:28100/milestones/' + idHito, {headers})
    .then((respuesta) => {

        let hito = respuesta.data;

        var formulario = document.forms.formModificarHito;

        formulario.nameHito.value = hito.name;
        formulario.fechaInicio.value = hito.start;
        formulario.fechaFinal.value = hito.end;
        formulario.progressHito.value = hito.progress;

    })
    .catch((error)=>{console.log(error)});
}

function modificarHito () {

    var formulario = document.forms.formModificarHito;

    const dataRequest = {
        "id": idHito,
        "name": formulario.nameHito.value,
        "start": formulario.fechaInicio.value,
        "end": formulario.fechaFinal.value,
        "progress": formulario.progressHito.value
    }

    axios.put('http://ligafalm.eu:28100/milestones/' + idHito, dataRequest, {headers})
    .then((respuesta)=>{
        console.log(respuesta.data);
        window.location.assign('hitos.html');
    })
    .catch((error)=>{console.log(error)});
}

