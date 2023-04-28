const request = new Request('https://j4jjw.mocklab.io/users');

const URL = request.url;
const method = request.method;
const credentials = request.credentials;

let array = [];

fetch(request)
.then(Response => Response.json())
.then(data => 
    array = data);

console.log(array)