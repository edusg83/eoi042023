let velocidad=2000,
i=0;
miFuncion=function(){
    console.log("Batman vuelve " +i);
    i=i+1;
    if (i>9){
        clearInterval(miFuncion,timer);
    }
};
var timer=setInterval(miFuncion,velocidad);