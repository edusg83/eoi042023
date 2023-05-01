const headers = {
    'content-Type': 'applecation/json',
    'Access-Control-Allow-Origin': '*'
};

let pagina = 0;
let tamanyo = 10;

//creación del listado del productos de la bd
function obtenerProductos() {
    const urlUsers = 'http://ligafalm.eu:28100/products?page='+pagina+'&size='+tamanyo;
    document.getElementById("contenidoTabla").innerHTML = ``
    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            let listaProductos = respuesta.data;

            listaProductos.forEach(element => {
                let filasContenido = `<tr>
                <td>${element.code}</td>
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td class="botoneraEditarBorrar d-flex">
                    <button type="button" class="btn" data-bs-toggle="modal"
                        data-bs-target="#detallesModal" onclick="actualizarModalProducto(${element.id})">
                        <img src="../image/pencil.svg" alt="botod de añadir" width="20px" title = "modificar"/>
                    </button>
                    <button type="button" class="btn" data-bs-toggle="modal"
                        data-bs-target="#modalBorrar" onclick="actualizarModalBorrar(${element.id})">
                        <img src="../image/trash.svg" alt="botod de añadir" width="20px" title = "borrar"/>
                    </button></td></tr>`
                    document.getElementById("contenidoTabla").innerHTML += filasContenido;
            });
        })
}
//obtención de los productos cuando se carga la página
obtenerProductos();

//obtención del producto específico para el modal #modalBorrar
function actualizarModalBorrar(id) {

    const urlUsers = 'http://ligafalm.eu:28100/products/' + id;
    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            document.getElementById("contenidoTablaModalBorrar").innerHTML = ""
            let producto = respuesta.data;
            let cardTabla = `
            <tr>
                <td id="idProductoBorrar">${producto.id}</td>
                <td>${producto.code}</td>
                <td>${producto.name}</td>
                <td>${producto.description}</td>
            </tr> `
            document.getElementById("contenidoTablaModalBorrar").innerHTML += cardTabla
        })
}

//Se borra la entrada de la bd que se mostraba en el modal #modalBorrar
function borrarEntrada() {

    let idArticulo = document.getElementById("idProductoBorrar").innerText;
    const url = 'http://ligafalm.eu:28100/products/' + idArticulo

    axios.delete(url, { headers })
        .then((respuesta) => {
            if (respuesta.status == 204) {
                document.getElementById("alertaExito").innerHTML = `
                    <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                    ¡Se ha borrado la entrada con éxito!</div>`
            }
            obtenerProductos();
        })
}

//vaciado de los formularios del modal #detallesModal
function limpiarModalDetalles() {
    document.getElementById("nombreProducto").value = null;
    document.getElementById("descripcionProducto").value = null;
    document.getElementById("codigoProducto").value = null;
    document.getElementById("descripcionModalDetalles").innerHTML = "Añade un nuevo producto a la base de datos"
}

//guardado del producto enviado en el modal #detallesModal
function guardar() {

    nombre = document.getElementById("nombreProducto").value;
    descripcion = document.getElementById("descripcionProducto").value;
    codigo = document.getElementById("codigoProducto").value;

    if (nombre.length != 0 && descripcion.length != 0 && codigo.length != 0) {
        const url = 'http://ligafalm.eu:28100/products';

        axios.post(url, {
            "name": nombre,
            "description": descripcion,
            "code": codigo
        },)
            .then((respuesta) => {
                if (respuesta.status == 200) {
                        document.getElementById("alertaExito").innerHTML = `
                            <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                            ¡Se ha creado el producto con éxito!</div>`
                }
                obtenerProductos();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
                document.getElementById("descripcionModalDetalles").innerHTML = "Añade un nuevo producto a la base de datos"
            })
    } else {
        document.getElementById("descripcionModalDetalles").innerHTML = `
            <div id="alertaDetalles" class="alert alert-danger" role="alert">
            Todos los campos deben estar rellenos</div>`
    }
}

//obtiene el producto que se quiere actualizar y lo muestra en el modal #detallesModal
function actualizarModalProducto(id) {
    document.getElementById("tituloModalDetalles").innerText = "Modifica el producto";
    document.getElementById("descripcionModalDetalles").innerText =
        "Modifica los campos teniendo en cuanta que ningún campo puede quedar vacío";

    const urlUsers = 'http://ligafalm.eu:28100/products/' + id;

    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            let producto = respuesta.data;
            document.getElementById("nombreProducto").value = producto.name;
            document.getElementById("descripcionProducto").value = producto.description;
            document.getElementById("codigoProducto").value = producto.code;
            if (document.getElementById("nombreProducto")){
                document.getElementById("guardarModalDetalles").setAttribute("onclick", "actualizarProducto(" + producto.id + ")");
            }
        })
}

//actualiza el producto enviado en el modal #detallesModal
function actualizarProducto(id) {
    nombre = document.getElementById("nombreProducto").value;
    descripcion = document.getElementById("descripcionProducto").value;
    codigo = document.getElementById("codigoProducto").value;

    if (nombre.length != 0 && descripcion.length != 0 && codigo.length != 0) {
        axios.put('http://ligafalm.eu:28100/products/' + id, {
            "id": id,
            "name": nombre,
            "description": descripcion,
            "code": codigo
        })
            .then(response => {
                if (response.status == 202) {
                    document.getElementById("alertaExito").innerHTML = `
                <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                ¡Se ha actualizado el producto con éxito!</div>`
                }
                obtenerProductos();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
            })
    } else {
        document.getElementById("descripcionModalDetalles").innerHTML = `
        <div id="alertaDetalles" class="alert alert-danger" role="alert">
        Todos los campos deben estar rellenos</div>`
    }
}

function paginaSiguiente(){
    pagina += 1;
    obtenerProductos();
    document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
}

function paginaPrevia(){
    if (pagina > 0) {
        pagina -= 1;
        obtenerProductos();
        document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
    }
}

function paginar(){
    tamanyo = document.getElementById("paginador").value;
    obtenerProductos();
}