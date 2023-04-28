
const request = new Request("https://j4jjw.mocklab.io/usersDataList");

fetch(request)
.then(response => response.json())
.then(data => {

    arrayData = data.arrayUsuarios;

    let tabla = `<table id="dataTable">
    <thead>
        <tr>
            <th>nombre</th>
            <th>apellidos</th>
            <th>direcciones</th>
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
            <td>${element.direcciones}</td>
        </tr>`
    });

    tabla += filas + finTabla;
    document.getElementById("resultados").innerHTML = tabla;
});