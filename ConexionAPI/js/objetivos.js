const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlObjetivos = 'http://ligafalm.eu:28100/goals?page=0&size=100';

axios.get(urlObjetivos, {headers})
.then((respuesta) => {
    
    let arrayData = respuesta.data;

    let tabla = `<table id="dataTable" class="table table-bordered dataTable">
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
    });

    tabla += filas + finTabla;
    document.getElementById("resultados").innerHTML = tabla;
})