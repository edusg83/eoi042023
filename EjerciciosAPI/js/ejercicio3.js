let cardHead = `
<div class="card col-4">
    <div class="card-header">Usuario</div>
    <div class="card-body">
        <h5 class="card-title">`
        
let cardTable = `</h5>
<table id="tabla" class="table">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Poblacion</th>
        </tr>
    </thead>
    <tbody>`

let cardFinal =  `</div> </div>`

const request = new Request('https://j4jjw.mocklab.io/usersDataList');

fetch(request)
.then(respuesta => respuesta.json())
.then(data => { 
    datoUsuario = data.arrayUsuarios

    datoUsuario.forEach(elem => {
        let cardTabla = ``
        elem.direcciones.forEach(item => {
            cardTabla += `<tr>
        <td>${item.nombre}</td>
        <td>${item.poblacion}</td>
        </tr>`
        });
        document.getElementById("contenedorCard").innerHTML += cardHead+`${elem.nombre} ${elem.apellidos} `+cardTable+cardTabla+cardFinal
    });
});

