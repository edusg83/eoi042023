const headers = {
    'content-Type': 'applecation/json',
    'Access-Control-Allow-Origin': '*'
};

let pagina = 0;
let tamanyo = 10;

//funciones de paginado de los resultados
function paginaSiguiente(){
    pagina += 1;
    obtenerTransacciones();
    document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
}

function paginaPrevia(){
    if (pagina > 0) {
        pagina -= 1;
        obtenerTransacciones();
        document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
    }
}

function paginar(){
    tamanyo = document.getElementById("paginador").value;
    obtenerTransacciones();
}

//creación del listado de transacciones de la bd
function obtenerTransacciones() {
    const urlUsers = 'http://ligafalm.eu:28100/transactions?page='+pagina+'&size='+tamanyo;
    document.getElementById("contenidoTabla").innerHTML = ``
    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            let listaProductos = respuesta.data;

            listaProductos.forEach(element => {
                let filasContenido = `<tr>
                <td class="pe-4">${element.productCode}</td>
                <td class="pe-0">${element.total}</td>
                <td class="pe-4">${element.done}</td>
                <td class="pe-4">${element.type}</td>
                <td class="d-flex justify-content-end">
                    <button type="button" class="btn ms-0 ps-0" data-bs-toggle="modal"
                        data-bs-target="#detallesModal" onclick="actualizarModalProducto(${element.id})">
                        <img src="../image/pencil.svg" alt="botod de añadir" width="20px"/>
                    </button>
                    <button type="button" class="btn  me-1" data-bs-toggle="modal"
                        data-bs-target="#modalBorrar" onclick="actualizarModalBorrar(${element.id})">
                        <img src="../image/trash.svg" alt="botod de añadir" width="20px" />
                    </button></td></tr>`
                    document.getElementById("contenidoTabla").innerHTML += filasContenido;
            });
        })
}
//obtención de las transacciones cuando se carga la página
obtenerTransacciones();

//vaciado de los formularios del modal #detallesModal
function limpiarModalDetalles() {

    document.getElementById("TotalVendido").value = null;
    document.getElementById("descripcionModalDetalles").innerHTML = `Introduce los datos de la transacción: `
}

//mapeo de id obtenidos al abrir el modal para crear o actualizar
let mapaProductos;
let mapaObjetivos;
let mapaUsuariosPorObjetivo;

function obtenerMapaIds(respuesta, texto=""){
    
    let mapa = new Map();
    respuesta.forEach(element => {
        if (texto === "assignedTo") {
            
            mapa.set(element.id, eval('element.'+texto))
        }else if (texto === "code") {
            mapa.set(element.name, element.code)
        }else{
            mapa.set(element.name, element.id)
        }
    })
    return mapa;
}

//obtención de los productos y objetivos disponibles 
function obtenerProductosYObjetivos(code= "", objetivo = -1, idTransaccion = -1){
    
    const urlProductos = 'http://ligafalm.eu:28100/products?page=0&size=1000';
    document.getElementById("nombreProducto").innerHTML = ``;
    
    axios.get(urlProductos, { headers })
        .then((respuesta) => {
            mapaProductos = obtenerMapaIds(respuesta.data, "code")
            
            respuesta.data.forEach(element => {
                let filasProductos;
                if(element.code == code){
                     filasProductos = `<option selected>${element.name}</option>`
                     
                }else{
                     filasProductos = `<option>${element.name}</option>`
                }
                document.getElementById("nombreProducto").innerHTML += filasProductos;
            });
        })

    const urlObjetivos = 'http://ligafalm.eu:28100/goals?page=0&size=1000';
    document.getElementById("objetivoAsignado").innerHTML = ``
    
    axios.get(urlObjetivos,{headers})
    .then((respuesta) =>{
        
        mapaObjetivos = obtenerMapaIds(respuesta.data)
        mapaUsuariosPorObjetivo = obtenerMapaIds(respuesta.data,"assignedTo")
        let filasObjetivos;
        respuesta.data.forEach(element => {
            if (element.id == objetivo) {
                filasObjetivos = `<option selected>${element.name}</option>`
            }else{
                filasObjetivos = `<option>${element.name}</option>`
            }
            document.getElementById("objetivoAsignado").innerHTML += filasObjetivos;
        });
    })
    let guardar
    document.getElementById("botoneraModalDetalles").innerHTML = ``;
    if(code ==""){
         guardar = `
         <button type="submit" id="guardarModalDetalles" class="btn btn-primary"
            onclick="guardarTransaccion()">Guardar</button>`
            document.getElementById("tituloModalDetalles").innerText = "Crear un producto" 
    }else{
         guardar= `<button type="submit" id="guardarModalDetalles" class="btn btn-primary"
        onclick="actualizarTransaccion(${idTransaccion})">Actualizar</button>`
        document.getElementById("tituloModalDetalles").innerText = "Modificar un producto" 
        }
    let cerrar = `<button type="button" id="cerrarModalDetalles" class="btn btn-secondary ms-3"
            onclick="limpiarModalDetalles()" data-bs-dismiss="modal">Cerrar</button>`

    document.getElementById("botoneraModalDetalles").innerHTML += guardar + cerrar; 
}

//guarda la transacción
function guardarTransaccion(){
    producto = document.getElementById("nombreProducto").value;
    objetivo = document.getElementById("objetivoAsignado").value;
    ventas = document.getElementById("TotalVendido").value;

    if(ventas > 0){

        const url = 'http://ligafalm.eu:28100/transactions';

        axios.post(url, {
            "type": "SELL",
            "total": ventas,
            "done": 0,
            "date": "2023-05-01T11:09:14.063Z",
            "productCode": mapaProductos.get(producto),
            "goal": mapaObjetivos.get(objetivo),
            "assignedTo": mapaUsuariosPorObjetivo.get(mapaObjetivos.get(objetivo))
        },)
            .then((respuesta) => {
                if (respuesta.status == 200) {
                        document.getElementById("alertaExito").innerHTML = `
                            <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                            ¡Se ha creado el producto con éxito!</div>`
                }
                obtenerTransacciones();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
                document.getElementById("descripcionModalDetalles").innerHTML = "Añade un nuevo producto a la base de datos"
            })
    } else {
        document.getElementById("descripcionModalDetalles").innerHTML = `
            <div id="alertaDetalles" class="alert alert-danger" role="alert">
            Todos los campos deben estar rellenos correctamente</div>`
    }
}

//obtener los detalles de la transacción que se quiere actualizar
function actualizarModalProducto(idTransaccion){
    const url = 'http://ligafalm.eu:28100/transactions/' + idTransaccion;

    axios.get(url, { headers })
        .then((respuesta) => {
            console.log(respuesta.data.total)
            document.getElementById("TotalVendido").value = respuesta.data.total
            obtenerProductosYObjetivos( respuesta.data.productCode,respuesta.data.goal,idTransaccion)
        })
}

//actualizar una transacción 
function actualizarTransaccion(idTransaccion){

    if (document.getElementById("TotalVendido").value > 0) {

        let producto = document.getElementById("nombreProducto").value;
        let objetivo = document.getElementById("objetivoAsignado").value;
        let ventas = document.getElementById("TotalVendido").value;
        let tipo, done, date;

        const url = 'http://ligafalm.eu:28100/transactions/' + idTransaccion;

        axios.get(url, { headers })
        .then((respuesta) => {
            tipo =respuesta.data.type
            done = respuesta.data.done
            date =respuesta.data.date

            axios.put('http://ligafalm.eu:28100/transactions/' + idTransaccion, {
            
            "id": idTransaccion,
            "type": tipo,
            "total": ventas,
            "done": done,
            "date": date,
            "productCode": mapaProductos.get(producto),
            "goal": mapaObjetivos.get(objetivo),
            "assignedTo": mapaUsuariosPorObjetivo.get(mapaObjetivos.get(objetivo))

            }).then(response => {
                if (response.status == 202) {
                    document.getElementById("alertaExito").innerHTML = `
                <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                ¡Se ha actualizado el producto con éxito!</div>`
                }
                obtenerTransacciones();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
            })

        })
    } else {
        document.getElementById("descripcionModalDetalles").innerHTML = `
        <div id="alertaDetalles" class="alert alert-danger" role="alert">
        Todos los campos deben estar rellenos</div>`
    }


}

//mostrar los datos de la transacción que se quiere borrar
function actualizarModalBorrar(idTransaccion){

    const urlUsers = 'http://ligafalm.eu:28100/transactions/' + idTransaccion;
    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            document.getElementById("contenidoTablaModalBorrar").innerHTML = ""
            
            let cardTabla = `
            <tr>
                <td>${respuesta.data.productCode}</td>
                <td>${respuesta.data.total}</td>
                <td>${respuesta.data.done}</td>
                <td>${respuesta.data.type}</td>
            </tr> `
            document.getElementById("contenidoTablaModalBorrar").innerHTML += cardTabla
            document.getElementById("botoneraModalBorrar").innerHTML = ""
            let botonera =`<button type="button" class="btn btn-primary" onclick="borrarEntrada(${idTransaccion})"
                        data-bs-dismiss="modal">Borrar entrada</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`
            document.getElementById("botoneraModalBorrar").innerHTML += botonera
        })
}

//Se borra la entrada de la bd que se mostraba en el modal #modalBorrar
function borrarEntrada(idTransaccion) {
    
    const url = 'http://ligafalm.eu:28100/transactions/' + idTransaccion
    axios.delete(url, { headers })
        .then((respuesta) => {
            if (respuesta.status == 204) {
                document.getElementById("alertaExito").innerHTML = `
                    <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                    ¡Se ha borrado la entrada con éxito!</div>`
            }
            obtenerTransacciones();
        })
}