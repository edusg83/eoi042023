const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlProductos = 'http://ligafalm.eu:28100/transactions?page=0&size=100';

axios.get(urlProductos, {headers})
.then((respuesta) => {

    let arrayData = respuesta.data;

    let tabla = `<table id="dataTable" class="table table-bordered dataTable">
    <thead>
        <tr>
            <th>Código Producto</th>
            <th>Ventas Totales</th>
            <th>Done</th>
            <th>Tipo</th>
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
            <td class="col-3">${element.productCode}</td>
            <td class="col-2">${element.total}</td>
            <td class="col-2">${element.done}</td>
            <td class="col-2">${element.type}</td>
            <td class="col-3">
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
.catch((error)=>{console.log(error)});

let idProducto = 0;


function previoBorrar (id) {
    idProducto = id;
}

function borrarProducto() {
    axios.delete('http://ligafalm.eu:28100/products/' + idProducto)
    .then((respuesta)=>{
        console.log(respuesta.data);
        window.location.assign('productos.html');
    })
    .catch((error)=>{console.log(error)});
}

function previoModificar (id) {

    idProducto = id;

    axios.get('http://ligafalm.eu:28100/products/' + idProducto, {headers})
    .then((respuesta) => {

        let producto = respuesta.data;

        var formulario = document.forms.formModificarProducto;

        formulario.name.value = producto.name;
        formulario.description.value = producto.description;
        formulario.code.value = producto.code;

    })
    .catch((error)=>{console.log(error)});
}

function modificarProducto () {
    var formulario = document.forms.formModificarProducto;

    const dataRequest = {
        "id": idProducto,
        "name": formulario.name.value,
        "description": formulario.description.value,
        "code": formulario.code.value
    }

    console.log("ID: " + idProducto + " y Nombre: " + formulario.name.value)
    console.log(dataRequest.name)

    axios.put('http://ligafalm.eu:28100/products/' + idProducto, dataRequest, {headers})
    .then((respuesta)=>{
        console.log(respuesta.data);
        window.location.assign('productos.html');
    })
    .catch((error)=>{console.log(error)});
}

function previoCrear () {

    axios.get('http://ligafalm.eu:28100/products?page=0&size=100', {headers})
    .then((respuestaProductos) => {

        let arrayProductos = respuestaProductos.data;

        let optionProductos = ``;

        arrayProductos.forEach(producto => {
            
            optionProductos += `<option value="${producto.code}">${producto.name}</option>`
        })

        document.getElementById("selectProduct").innerHTML = optionProductos;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/goals?page=0&size=100', {headers})
    .then((respuestaObjetivos) => {

        let arrayObjetivos = respuestaObjetivos.data;

        let opctionObjetivos = ``;

        arrayObjetivos.forEach(objetivo => {
            
            opctionObjetivos += `<option value="${objetivo.id}">${objetivo.name}</option>`
        });

        document.getElementById("selectGoals").innerHTML = opctionObjetivos;

    }).catch((error)=>{console.log(error)});

}

function crearTransaccion() {

    var formulario = document.forms.formCrearTransaccion;

    const dataRequest = {
        "type": "SELL",
        "productCode": formulario.selectProduct.value,
        "total": formulario.total.value,
        "done": 0,
        "goal": formulario.selectGoals.value
    }

    axios.post("http://ligafalm.eu:28100/transactions", dataRequest, {headers})
    .then((respuesta)=>{
        console.log(respuesta.data);
        window.location.assign('transacciones.html');
    })
    .catch((error)=>{console.log(error)});
}







