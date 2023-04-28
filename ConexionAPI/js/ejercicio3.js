const request = new Request("https://j4jjw.mocklab.io/users");

fetch(request)
.then(response => response.json())
.then(data => {

    arrayData = data.arrayUsuarios;

    arrayData.forEach(element => {
        
        let card = `
        <div class="card">
            <div class="card-header">`;

        
        let nombre_apellidos = ``;

        nombre_apellidos += ` ${element.nombre}`;
        nombre_apellidos += ` ${element.apellidos}`;

        card += nombre_apellidos;

        let cardBody = `
            </div>
            <div class="card-body">
            <p class="card-text">

        `
        card += cardBody;

        direccion = ` ${element.direccion}</p></div>`;

        card += direccion


        document.getElementById("resultados").innerHTML += card;
    });
    
});



