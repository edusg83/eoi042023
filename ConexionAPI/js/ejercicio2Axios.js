const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlUsers = 'https://j4jjw.mocklab.io/users';

axios.get(urlUsers, {headers})
.then((respuestaUsuarios) => {

    let arrayData = respuestaUsuarios.data.arrayUsuarios;

    let tabla = `<table id="dataTable">
    <thead>
        <tr>
            <th>nombre</th>
            <th>apellidos</th>
            <th>direccion</th>
        </tr>
    </thead>
    <tbody>`;

    let finTabla = `</tbody>
                    </table>`;

    let filas = ``;

    arrayData.forEach(element => {
        
        filas += `
        <tr>
            <td>${element.nombre}</td>
            <td>${element.apellidos}</td>
            <td>${element.direccion}</td>
        </tr>`
    });

    tabla += filas + finTabla;
    document.getElementById("resultados").innerHTML = tabla;

})





