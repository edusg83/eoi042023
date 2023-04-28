const headers={
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

const urlUsers='https://j4jjw.mocklab.io/usersDataList';

axios.get(urlUsers, {headers})
.then((respuestaUsuarios) => {
    let users;
    users=respuestaUsuarios.data.arrayUsuarios;
    addresses=respuestaUsuarios.data.arrayUsuarios.direcciones;

    users.forEach(element => {
        console.log(element.nombre);
        console.log(element.apellidos);
        addresses.forEach(element => {
            console.log(element.nombre);
            console.log(element.poblacion);
        });
    });

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

    users.forEach(item => {
        filas+=`<tr>
        <td>${item.id}</td>
        <td>${item.tarjeta}</td>
        <td>${item.propietario}</td>
        </tr>`;
    });

    tabla=tabla+filas+finTabla;
    document.getElementById("resultados").innerHTML=tabla;
})