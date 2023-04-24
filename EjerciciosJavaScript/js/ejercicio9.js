(function(num){
    var counter = 1;

    function viaAlert() { alert("Valor: " + (++num)); };
    function viaConsole() {console.log("Valor: " + (num--)); };

    viaAlert();
    viaConsole();
})(3);