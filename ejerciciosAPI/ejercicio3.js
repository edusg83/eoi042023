const request = new Request('https://j4jjw.mocklab.io/usersDataList');

const URL=request.url;
const method=request.method;
const credentials=request.credentials;

let array=[];

fetch(request)
.then(response => response.json())
.then(data => {

    arrayData=data.arrayUsuarios;


      
})



