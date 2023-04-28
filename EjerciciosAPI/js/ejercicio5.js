let tabla = `<table id="tabla" class="table">
<thead>
    <tr>
        <th>Nombre</th>
        <th>Apellidos</th>
        <th>Direccion</th>
    </tr>
</thead>
<tbody>`
let datosTabla = ``
let finalTabla = `</tbody> </table>`

const headers = {
    'content-Type':'applecation/json',
    'Access-Control-Allow-Origin':'*'
};

const urlUsers = 'https://j4jjw.mocklab.io/users';

axios.get(urlUsers, {headers})
.then((respuesta) => {
    let arrayData = respuesta.data.arrayUsuarios;
    arrayData.forEach(elem => {
        datosTabla += `<tr>
            <td>${elem.nombre}</td>
            <td>${elem.apellidos}</td>
            <td>${elem.direccion}</td>
            </tr>`
    });
    document.getElementById("contenedorTabla").innerHTML= tabla+datosTabla+finalTabla
});



