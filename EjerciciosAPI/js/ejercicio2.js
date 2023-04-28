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

const request = new Request('https://j4jjw.mocklab.io/users');

fetch(request)
.then(respuesta => respuesta.json())
.then(data => {  //data = respuesta.json() y seguidamente hace la funcion entre {} 
    console.log(data);
    console.log(data.arrayUsuarios);
    arrayData=data.arrayUsuarios;

    arrayData.forEach(elem => {
        datosTabla += `<tr>
            <td>${elem.nombre}</td>
            <td>${elem.apellidos}</td>
            <td>${elem.direccion}</td>
            </tr>`
    });
    document.getElementById("contenedorTabla").innerHTML= tabla+datosTabla+finalTabla
});



