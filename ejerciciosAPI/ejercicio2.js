const request = new Request('https://j4jjw.mocklab.io/users');

const URL=request.url;
const method=request.method;
const credentials=request.credentials;

let array=[];

fetch(request)
.then(response => response.json())
.then(data => {

    console.log(data);
    console.log(data.arrayUsuarios);
    arrayData=data.arrayUsuarios;    
})

let table='<table id="dataTable">
<thead>
    <tr>
        <th>Id</th>
        <th>Target</th>
        <th>Propietario</th>
    </tr>
</thead>
<tbody>';
    let finTable=""
</tbody>