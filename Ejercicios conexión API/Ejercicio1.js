const request = new request("https://j4jjw.mocklab.io/users");

const URL = request.url;
const method = request.method;
const credentials = request.credentials

let array = [];

fetch(request)
.then(Response => Response.json())
.then(data => {
    console.log(data)
});



