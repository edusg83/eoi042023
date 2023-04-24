var sema = null;

console.log(sema === null);      //true
console.log(sema == null);       //true
console.log(sema == undefined);  //true


var sema2 = undefined;
console.log(sema2 == undefined);   //true
console.log(sema2 === undefined);  //true

console.log(typeof(sema2) == "undefined");   //true
console.log(typeof(sema2) == undefined);     //false
console.log(typeof(sema2) === "undefined");  //true
console.log(typeof(sema2) === undefined);    //false





