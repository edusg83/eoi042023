var nombre = "Sonia";
var obj = {
    nombre: "Pepito",
        saludo: function() {
            var saludo_fn = function() {
                console.log("hola " + this.nombre);
            };
            saludo_fn();
        }
    };

obj.saludo_fn();