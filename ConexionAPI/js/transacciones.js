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

let idTransaccion = 0;


function previoBorrar (id) {
    idTransaccion = id;
}

function borrarTransaccion() {

    axios.delete('http://ligafalm.eu:28100/transactions/' + idTransaccion)
    .then((respuesta)=>{

        console.log(respuesta.data);
        window.location.assign('transacciones.html');

    }).catch((error)=>{console.log(error)});

}

function previoModificar (id) {

    idTransaccion = id;
    var formulario = document.forms.formModificarTransaccion;
    var arrayTransaccion;

    axios.get('http://ligafalm.eu:28100/products?page=0&size=100/', {headers})
    .then((respuestaProductos) => {
        let arrayProductos = respuestaProductos.data;
        let optionProductos = ``;

        arrayProductos.forEach(producto => {
                optionProductos += `<option value="${producto.code}">${producto.name}</option>`;

        })

        document.getElementById("selectModProduct").innerHTML = optionProductos;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/goals?page=0&size=100', {headers})
    .then((respuestaObjetivos) => {
        
        //let idObjetivo = arrayTransaccion.goal;
        let arrayObjetivos = respuestaObjetivos.data;

        let optionObjetivos = ``;

        arrayObjetivos.forEach(objetivo => {


                optionObjetivos += `<option value="${objetivo.id}">${objetivo.name}</option>`;
            

        });

        document.getElementById("selectModGoals").innerHTML = optionObjetivos;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/transactions/' + id, {headers})
    .then((respuestaTransaccion) => {

        arrayTransaccion = respuestaTransaccion.data;

        
        formulario.selectModGoals.value=arrayTransaccion.goal;
        formulario.selectModProduct.value=arrayTransaccion.productCode;
        formulario.totalMod.value = arrayTransaccion.total;
    
    }).catch((error)=>{console.log(error)});

    
   

}

function modificarTransaccion () {
    var formulario = document.forms.formModificarTransaccion;

    const dataRequest = {
        "id": idTransaccion,
        "type": "SELL",
        "productCode": formulario.selectModProduct.value,
        "total": formulario.totalMod.value,
        "done": 0,
        "goal": formulario.selectModGoals.value
    }

    axios.put('http://ligafalm.eu:28100/transactions/' + idTransaccion, dataRequest, {headers})
    .then((respuesta)=>{
        console.log(respuesta.data);
        window.location.assign('transacciones.html');
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

        let optionObjetivos = ``;

        arrayObjetivos.forEach(objetivo => {
            
            optionObjetivos += `<option value="${objetivo.id}">${objetivo.name}</option>`
        });

        document.getElementById("selectGoals").innerHTML = optionObjetivos;

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







