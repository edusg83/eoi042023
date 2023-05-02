const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlProductos = 'http://ligafalm.eu:28100/products?page=0&size=100';

axios.get(urlProductos, {headers})
.then((respuesta) => {

    let arrayData = respuesta.data;

    let tabla = `<table id="dataTable" class="table table-bordered dataTable">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Code</th>
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
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>${element.code}</td>
            <td>
                <button class="btn btn-primary btn-circle">
                    <i  data-bs-toggle="modal" data-bs-target="#modalBorrar" onclick="previoBorrar(${element.id})" class="bi bi-trash"></i>
                </button>
                <button class="btn btn-primary btn-circle">
                    <i  data-bs-toggle="modal" data-bs-target="#modalModificar" onclick="previoModificar(${element.id})" class="bi bi-pencil"></i>
                </button>
            </td>
        </tr>`
    });

    tabla += filas + finTabla;
    document.getElementById("resultados").innerHTML = tabla;

})

let idProducto = 0;


function previoBorrar (id) {
    console.log("Dentro de la funcion previoBorrar, idProducto = " + id);
    idProducto = id;
}

function borrarProducto() {
    console.log("Dentro de la funcion borrar, idProducto = " + idProducto);
    axios.delete('http://ligafalm.eu:28100/products/' + idProducto)
    .then();
}

function crearProducto() {

    var formulario = document.forms.formCrearProducto;

    const dataRequest = {
        "name": formulario.name.value,
        "description": formulario.description.value,
        "code": formulario.code.value
    }

    console.log(dataRequest.name)

    axios.post("http://ligafalm.eu:28100/products", dataRequest, {headers})
    .then();
}







