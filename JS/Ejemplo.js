(function(num){
var counter = 1;

function viaAlert() { alert ("valor: " + (++num)); };
function viaConsole() { console.log("valor: " + (num--)); };

viaAlert();
viaConsole();

})(3);