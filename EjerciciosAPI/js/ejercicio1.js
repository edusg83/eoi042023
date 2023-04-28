const request = new Request('https://j4jjw.mocklab.io/users');

const URL = request.url;
const method = request.method;
const credentials = request.credentials;

let array = [];

fetch(request)
.then(respuesta => respuesta.json())
.then(data => { 
    console.log(data);
    console.log(data.arrayUsuarios);
    arrayData=data.arrayUsuarios;
    document.getElementById("nombre").innerHTML=arrayData[0].nombre;
    document.getElementById("apellidos").innerHTML=arrayData[0].apellidos;
    document.getElementById("direccion").innerHTML=arrayData[0].direccion;
});

