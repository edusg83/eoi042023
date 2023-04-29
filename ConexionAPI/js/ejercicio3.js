const request = new Request("https://j4jjw.mocklab.io/usersDataList");

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
        `
    
        let arrayDirecciones  = element.direcciones;

        arrayDirecciones.forEach(direccion => {
            cardBody += `<p class="card-text">`
            cardBody += ` ${direccion.nombre}</p>`;
            cardBody += `<p class="card-text">`
            cardBody += ` ${direccion.poblacion}</p>`;

        })

        cardBody += `</div>`;
        card += cardBody;

        document.getElementById("resultados").innerHTML += card;
    });
    
});



