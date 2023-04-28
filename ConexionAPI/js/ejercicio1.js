const request = new Request("https://j4jjw.mocklab.io/users");

fetch(request)
.then(response => response.json())
.then(data => console.log(data));

