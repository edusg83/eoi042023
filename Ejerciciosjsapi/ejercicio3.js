
const request = new Request('https://j4jjw.mocklab.io/usersDataList');
const URL = 
let tabla=`<table id="dataTable" class="table">
<thead>
    <tr>
        <th>Id</th>
        <th>Tarjeta</th>
        <th>Propietario</th>
    </tr>
</thead>
<tbody>`;
let finTabla=`</tbody></table>`;

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