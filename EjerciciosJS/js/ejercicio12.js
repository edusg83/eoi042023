let nombre = "Sonia";
let obj = {
    nombre: "Pepito",
    saludo: function () {
        let saludo_fn = function (nombre) {
            console.log("hola " + nombre);
        };
        saludo_fn(this.nombre);
        }
    };
obj.saludo();