idTransaccion = id;
    var formulario = document.forms.formModificarTransaccion;
    var arrayTransaccion;

    axios.get('http://ligafalm.eu:28100/transactions/' + id, {headers})
    .then((respuestaTransaccion) => {

        arrayTransaccion = respuestaTransaccion.data;
        console.log("estoy en el axios de transaccionm" +  arrayTransaccion.productCode)

    }).catch((error)=>{console.log(error)});

    console.log("estoy fuera del axios de transaccionm" +  arrayTransaccion.productCode)

    axios.get('http://ligafalm.eu:28100/products?page=0&size=100/', {headers})
    .then((respuestaProductos) => {

        let arrayProductos = respuestaProductos.data;

        let optionProductos = ``;

        arrayProductos.forEach(producto => {

            optionProductos += `<option value="${producto.code}">${producto.name}</option>`

            if (producto.id === arrayTransaccion.productCode) {
                console.log(producto.id + " " + arrayTransaccion.productCode)
                formulario.selectModProduct.value = producto.name;
            }

        })

        document.getElementById("selectModProduct").innerHTML = optionProductos;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/goals?page=0&size=100', {headers})
    .then((respuestaObjetivos) => {

        let arrayObjetivos = respuestaObjetivos.data;

        let opctionObjetivos = ``;

        arrayObjetivos.forEach(objetivo => {

            opctionObjetivos += `<option value="${objetivo.id}">${objetivo.name}</option>`;

            if (objetivo.id === arrayTransaccion.goal) {
                formulario.selectModGoals.value = objetivo.name;
            }

        });

        document.getElementById("selectModGoals").innerHTML = opctionObjetivos;

    }).catch((error)=>{console.log(error)});


    console.log("Estoy en el final de la funcion" + arrayTransaccion.productCode)

    formulario.totalMod.value = arrayTransaccion.total;




    idTransaccion = id;
    var formulario = document.forms.formModificarTransaccion;
    let arrayTransaccion;

    axios.get('http://ligafalm.eu:28100/transactions/' + id, {headers})
    .then((respuestaTransaccion) => {

        arrayTransaccion = respuestaTransaccion.data;
        console.log("Estoy en el axios de transaccion" + arrayTransaccion.goal);

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/products?page=0&size=100/', {headers})
    .then((respuestaProductos) => {

        let arrayProductos = respuestaProductos.data;

        let optionProductos = ``;

        arrayProductos.forEach(producto => {
            if(producto.code === arrayTransaccion.productCode) {
                optionProductos += `<option value="${producto.code}" selected>${producto.name}</option>`
            } else {
                optionProductos += `<option value="${producto.code}">${producto.name}</option>`
            }

        })

        document.getElementById("selectModProduct").innerHTML = optionProductos;

    }).catch((error)=>{console.log(error)});

    axios.get('http://ligafalm.eu:28100/goals?page=0&size=100', {headers})
    .then((respuestaObjetivos) => {

        let arrayObjetivos = respuestaObjetivos.data;

        let opctionObjetivos = ``;

        arrayObjetivos.forEach(objetivo => {
            
            if(objetivo.id === arrayTransaccion.goal) {
                opctionObjetivos += `<option value="${objetivo.id}">${objetivo.name}</option>`
            } else {
                opctionObjetivos += `<option value="${objetivo.id}">${objetivo.name}</option>`
            }
        });

        document.getElementById("selectModGoals").innerHTML = opctionObjetivos;

    }).catch((error)=>{console.log(error)});