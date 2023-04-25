//a)
// let nombre="Sonia";
// let obj={
//     nombre:"Pepito",
//         saludo: function(){
            
//             let saludo_fn = function(){
//                 console.log("hola " + this.nombre);
//             };
//             saludo_fn(this.nombre);
//         } 
// };
// obj.saludo();

//COMPROBACION
let obj={
    clicks:0,
    init:function(){
        console.log("init", this);
        $("#elemento").click(function(){
            HTMLFormControlsCollection.log("Clicked: ", this);
            this.clicks += 1;
            console.log("Clicks: " + this.clicks);
        });
    }
};
obj.init();

function pinchaBoton