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

function iniciarSesion(){
    
    let user =document.getElementById("usuario").value
    let pass =document.getElementById("password").value
    console.log(user)

    axios.post('https://eoi.wiremockapi.cloud/token', {
        "username": user,
        "password": pass
    },)
        .then((respuesta) => {
        sessionStorage.setItem('token',respuesta.data["access-token"]);
        token = sessionStorage.getItem('token',respuesta.data["access-token"]);
        console.log("datos del token codificado: "+token)
        
        /* DECODIFICAR TOKEN */
        let base64Token=token.split('.')[1];
        let base64aux=base64Token.replace('-','+').replace('_','/');
        let decodedToken = JSON.parse(window.atob(base64aux));


        console.log("datos del token decodificado: " + decodedToken)
        
        let id=decodedToken.id;
        let username = decodedToken.username;
        let email = decodedToken.email;
        let roles = decodedToken.roles;

        console.log("id: "+ id+ ", username: "+username+", email: "+email+", roles: "+roles)

        console.log(token)
        
        // Con el identificador obtenido (id) llamar al siguiente endpoint para conseguir la información del usuario
        let urlId = 'https://eoi.wiremockapi.cloud/usuario/'+ id
        axios.get(urlId, { 
            'token': token
         })
            .then((respuesta) => {
                
                console.log(respuesta)
            })
        })
}