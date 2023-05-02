const headers = {
    'content-Type': 'applecation/json',
    'Access-Control-Allow-Origin': '*'
};

let pagina = 0;
let tamanyo = 10;

//funciones de paginado de los resultados
function paginaSiguiente(){
    pagina += 1;
    obtenerObjetivos();
    document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
}

function paginaPrevia(){
    if (pagina > 0) {
        pagina -= 1;
        obtenerObjetivos();
        document.getElementById("paginaActual").innerText = "pagina: "+(pagina+1)
    }
}

function paginar(){
    tamanyo = document.getElementById("paginador").value;
    obtenerObjetivos();
}

//creación del listado de objetivos de la bd
function obtenerObjetivos(){

    const urlUsers = 'http://ligafalm.eu:28100/goals?page='+pagina+'&size='+tamanyo;
    document.getElementById("contenidoTabla").innerHTML = ``
    axios.get(urlUsers, { headers })
        .then((respuesta) => {
            let listaProductos = respuesta.data;

            listaProductos.forEach(element => {
                console.log(element.transactions.length)

                let filasContenido = `<tr>
                <td>${element.name}</td>
                <td>${element.description}</td>
                <td>${element.assignedTo}</td>
                <td>${element.progress}</td>
                <td>${element.transactions.length}</td>
                <td class="d-flex justify-content-end">
                    <button type="button" class="btn ms-0 ps-0">
                    <img src="../image/search.svg" alt="boton de buscar" width="20px"/>
                     </button>
                    <button type="button" class="btn ms-0 ps-0" data-bs-toggle="modal"
                        data-bs-target="#detallesModal" onclick="actualizarModalProducto(${element.id})">
                        <img src="../image/pencil.svg" alt="botod de añadir" width="20px"/>
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

function obtenerAsignaciones(){



}
/**crear un objetivo
 * {
  "name": "prueba",
  "description": "descripcion",
  "assignedTo": 5,
  "progress": 0
}
 */
/*
{
    "id": 8,
    "name": "objetivo 1",
    "description": "Descripcion objetivo 1",
    "assignedTo": "AdminUserTestUsername",
    "progress": 0,
    "transactions": [
      {
        "id": 12,
        "type": "SELL",
        "total": 3,
        "done": 0,
        "date": null,
        "productCode": "CAL-XXX",
        "goal": null,
        "assignedTo": null
      },
      {
        "id": 100,
        "type": "SELL",
        "total": 6,
        "done": 0,
        "date": "2023-05-01T11:09:14.063",
        "productCode": "COD-BAL-VOL",
        "goal": null,
        "assignedTo": null
      },
      {
        "id": 139,
        "type": "SELL",
        "total": 35,
        "done": 0,
        "date": "2023-05-02T17:21:40.313",
        "productCode": "COD-BAL-FUT",
        "goal": null,
        "assignedTo": null
      }
    ]
  },

*/