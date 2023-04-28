/* Respuesta de la API */
let arrayEjemplo=[{
    "id":"1",
    "tarjeta":"1111 2222 3333 4444",
    "propietario": "Propietario tarjeta 1"
},
{
    "id":"2",
    "tarjeta":"5555 2222 3333 4444",
    "propietario": "Propietario tarjeta 2"
},
{
    "id":"3",
    "tarjeta":"6666 2222 3333 4444",
    "propietario": "Propietario tarjeta 3"
}]

//Generación dinámica de la tabla

/* ENCABEZADO - PARTE FIJA DE LA TABLA */
let tabla=`<table id="dataTable" class="table">
<thead>
    <tr>
        <th>Id</th>
        <th>Tarjeta</th>
        <th>Propietario</th>
    </tr>
</thead>
<tbody>`;
/* PARTE FINAL DE LA TABLA - FIJA*/
let finTabla=`</tbody></table>`;

/* PARTE DINÁMICA */
let filas=``;

arrayEjemplo.forEach(item => {
    filas+=`<tr>
    <td>${item.id}</td>
    <td>${item.tarjeta}</td>
    <td>${item.propietario}</td>
    </tr>`;
});

tabla=tabla+filas+finTabla;
document.getElementById("resultados").innerHTML=tabla;
