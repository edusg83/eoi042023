/*
1- Hacer login (maquetar formulario con botón de enviar)
[POST] https://eoi.wiremockapi.cloud/token
{usuario: "eoi@eoi.com",
passwd: "eoi"}

2- Almacenar el token en SessionStorage del navegador

3- Decodificar el token y sacar las siguientes variables:
    - username
    - email
    - roles
    - id

4- Con el identificador obtenido (id) llamar al siguiente endpoint para conseguir la información del usuario

[GET] https://eoi.wiremockapi.cloud/usuario/{id}
id por pathvariable
HEADER: token

5-. Insertar la respuesta en json-server o en el siguiente endpoint
[POST]
https://eoi.wiremockapi.cloud/usuario
body: enviar la respuesta sin el identificador
HEADER: token */



let token;

function iniciarSesion() {

    let user = document.getElementById("usuario").value
    let pass = document.getElementById("password").value


    axios.post('https://eoi.wiremockapi.cloud/token', {
        "username": user,
        "password": pass
    },)
        .then((respuesta) => {
            sessionStorage.setItem('token', respuesta.data["access-token"]);
            token = sessionStorage.getItem('token', respuesta.data["access-token"]);

            document.getElementById("info1").innerText = "datos del token codificado: " + token

            /* DECODIFICAR TOKEN */
            let base64Token = token.split('.')[1];
            let base64aux = base64Token.replace('-', '+').replace('_', '/');
            let decodedToken = JSON.parse(window.atob(base64aux));

            let id = decodedToken.id;
            let username = decodedToken.username;
            let email = decodedToken.email;
            let roles = decodedToken.roles;

            document.getElementById("info2").innerText = "datos del token decodificado: "+ 
            "id: " + id + ", username: " + username + ", email: " + email + ", roles: " + roles 


            // Con el identificador obtenido (id) llamar al siguiente endpoint para conseguir la información del usuario
            const headers = { 'token': token }
            let urlId = 'https://eoi.wiremockapi.cloud/usuario/' + id

            axios.get(urlId, { headers })
                .then((respuestaGet) => {

                    document.getElementById("info3").innerText = "Datos del Usuario devueltos:  "+ respuestaGet.data['email']+",  "+ respuestaGet.data['username']

                    axios.post('https://eoi.wiremockapi.cloud/usuario', {
                        "email": respuestaGet.data['email'],
                        "username": respuestaGet.data['username']
                    },{ headers })
                        .then((respuestaPost) => {
                           
                            document.getElementById("info5").innerText = "Estado: "+ respuestaPost.status
                        })
                })
        })
    }

