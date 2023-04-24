function suma(param1, param2){
    return param1+param2;
}
console.log(suma(12,12));

(function(param1, param2){
    console.log(param1+param2);
}(12,12));