const headers = {
  'content-Type': 'applecation/json',
  'Access-Control-Allow-Origin': '*'
};

let pagina = 0;
let tamanyo = 10;

//funciones de paginado de los resultados
function paginaSiguiente() {
  pagina += 1;
  obtenerObjetivos();
  document.getElementById("paginaActual").innerText = "pagina: " + (pagina + 1)
}

function paginaPrevia() {
  if (pagina > 0) {
    pagina -= 1;
    obtenerObjetivos();
    document.getElementById("paginaActual").innerText = "pagina: " + (pagina + 1)
  }
}

function paginar() {
  tamanyo = document.getElementById("paginador").value;
  obtenerObjetivos();
}

//creación del listado de objetivos de la bd
function obtenerObjetivos() {

  const urlUsers = 'http://ligafalm.eu:28100/goals?page=' + pagina + '&size=' + tamanyo;
  document.getElementById("contenidoTabla").innerHTML = ``
  axios.get(urlUsers, { headers })
    .then((respuesta) => {
      let listaProductos = respuesta.data;

      listaProductos.forEach(element => {

        let filasContenido = `<tr>
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td>${element.assignedTo}</td>
                <td>${element.progress}</td>
                <td>${element.transactions.length}</td>
                <td class="d-flex justify-content-end">
                    <button type="button" class="btn ms-0 ps-0" data-bs-toggle="modal"
                    data-bs-target="#modalTransacciones" onclick="actualizarModalTransacciones(${element.id})">
                    <img src="../image/search.svg" alt="boton de buscar" width="20px"/>
                     </button>
                    <button type="button" class="btn  ms-0 ps-0" data-bs-toggle="modal"
                        data-bs-target="#modalBorrar" onclick="actualizarModalBorrar(${element.id})">
                        <img src="../image/trash.svg" alt="botod de añadir" width="20px" />
                    </button></td></tr>`
        document.getElementById("contenidoTabla").innerHTML += filasContenido;
      });
    })
}


//obtención de las transacciones cuando se carga la página
obtenerObjetivos();


function actualizarModalTransacciones(idObjetivo){

  const urlUsers = 'http://ligafalm.eu:28100/goals/' + idObjetivo;
  axios.get(urlUsers, { headers })
      .then((respuesta) => {
          document.getElementById("contenidoTablaModalTransacciones").innerHTML = ""
         
          respuesta.data.transactions.forEach(element => {
            let cardTabla = `
            <tr>
                <td>${element.id}</td>
                <td>${element.productCode}</td>
                <td>${element.total}</td>
                <td>${element.type}</td>
            </tr> `
            document.getElementById("contenidoTablaModalTransacciones").innerHTML += cardTabla
            });
        })
} 

//mostrar los datos de la transacción que se quiere borrar
function actualizarModalBorrar(idObjetivo){

  const urlUsers = 'http://ligafalm.eu:28100/goals/' + idObjetivo;
  axios.get(urlUsers, { headers })
      .then((respuesta) => {
          document.getElementById("contenidoTablaModalBorrar").innerHTML = ""
         
          let cardTabla = `
          <tr>
              <td>${respuesta.data.id}</td>
              <td>${respuesta.data.name}</td>
              <td>${respuesta.data.description}</td>
              <td>${respuesta.data.assignedTo}</td>
              <td>${respuesta.data.transactions.length}</td>
          </tr> `
          document.getElementById("contenidoTablaModalBorrar").innerHTML += cardTabla
            document.getElementById("botoneraModalBorrar").innerHTML = ""

            let botonera;
            if(respuesta.data.transactions.length > 0){
              botonera =`<button type="button" class="btn btn-primary")"
                        >Borrar entrada</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`
            }else{
              botonera =`<button type="button" class="btn btn-primary" onclick="borrarEntrada(${idObjetivo})"
                        data-bs-dismiss="modal">Borrar entrada</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>`
            }
            
            document.getElementById("botoneraModalBorrar").innerHTML += botonera
      })
}

//Se borra la entrada de la bd que se mostraba en el modal #modalBorrar
function borrarEntrada(idObjetivo) {
    
  const url = 'http://ligafalm.eu:28100/goals/' + idObjetivo
  axios.delete(url, { headers })
      .then((respuesta) => {
          if (respuesta.status == 204) {
              document.getElementById("alertaExito").innerHTML = `
                  <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                  ¡Se ha borrado la entrada con éxito!</div>`
          }
          obtenerObjetivos();
      })
}


//mapeo de id obtenidos al abrir el modal para crear o actualizar
let mapaUsuarios;
let mapaHitos;

function obtenerMapaIds(respuesta, texto = "") {

  let mapa = new Map();
  respuesta.forEach(element => {
    if (texto === "usuarios") {
      mapa.set(element.username, element.id)
    } else {
      mapa.set(element.name, element.id)
    }
  })
  return mapa;
}

function obtenerAsignaciones(code = -1) {
  const url = 'http://ligafalm.eu:28100/users?page=0&size=1000';
  document.getElementById("usuarioAsignado").innerHTML = ``;

  axios.get(url, { headers })
    .then((respuesta) => {
      mapaUsuarios = obtenerMapaIds(respuesta.data, "usuarios")

      respuesta.data.forEach(element => {
        let filasProductos;
        if (element.code == code) {
          filasProductos = `<option selected>${element.username}</option>`

        } else {
          filasProductos = `<option>${element.username}</option>`
        }
        document.getElementById("usuarioAsignado").innerHTML += filasProductos;
      });
    })

  const urlHitos = 'http://ligafalm.eu:28100/milestones?page=0&size=1000';
  document.getElementById("hitoAsignado").innerHTML = ``;

  axios.get(urlHitos, { headers })
    .then((respuesta) => {
      mapaHitos = obtenerMapaIds(respuesta.data, "hito")

      respuesta.data.forEach(element => {
        let filasProductos;
        if (element.code == code) {
          filasProductos = `<option selected>${element.name}</option>`

        } else {
          filasProductos = `<option>${element.name}</option>`
        }
        document.getElementById("hitoAsignado").innerHTML += filasProductos;
      });
    })
}

function limpiarModalDetalles() {
  document.getElementById("nombreObjetivo").value = ""
  document.getElementById("descripcionObjetivo").value = ""
  document.getElementById("descripcionModalDetalles").innerHTML = `Añade un nuevo objetivo a la base de datos `
}


function guardarObjetivo() {

  nombre = document.getElementById("nombreObjetivo").value;
  descripcion = document.getElementById("descripcionObjetivo").value;
  nombreUsuario = document.getElementById("usuarioAsignado").value;
  nombreHito = document.getElementById("hitoAsignado").value;


  if (nombre.length > 0 && descripcion.length > 0) {

    const url = 'http://ligafalm.eu:28100/goals';

    axios.post(url, {
      "name": nombre,
      "description": descripcion,
      "assignedTo": mapaUsuarios.get(nombreUsuario),
      "progress": 0
    })
      .then((respuesta) => {
        if (respuesta.status == 200) {

          axios.put('http://ligafalm.eu:28100/goals/milestone/' + mapaHitos.get(nombreHito), {

            "idMilestone": mapaHitos.get(nombreHito),
            "goals": [respuesta.data]
          })
            .then((respuesta) => {
              if (respuesta.status == 202) {
                document.getElementById("alertaExito").innerHTML = `
                          <div  class="alert alert-success m-0 p-1 pe-2 ps-2 alertaExitoVisible" role="alert">
                          ¡Se ha creado el objetivo con éxito!</div>`
                obtenerObjetivos();
                limpiarModalDetalles();
                document.getElementById("cerrarModalDetalles").click()
                document.getElementById("descripcionModalDetalles").innerHTML = "Añade un nuevo objetivo a la base de datos"
              }
            })
        }
      })
  } else {
    document.getElementById("descripcionModalDetalles").innerHTML = `
          <div id="alertaDetalles" class="alert alert-danger" role="alert">
          Todos los campos deben estar rellenos correctamente</div>`
  }
}
