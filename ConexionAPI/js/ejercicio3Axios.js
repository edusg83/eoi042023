const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
}

const urlUsers = 'https://j4jjw.mocklab.io/usersDataList';

axios.get(urlUsers, {headers})
.then((respuestaUsuarios) => {

    let arrayData = respuestaUsuarios.data.arrayUsuarios;

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



