var array1 = [1,2,3,4];

function valor() {

    for (var i = 0; i < array1.length; i++) {
        var numero = array1[i];

        switch (numero) {
            case 1: 
                console.log("UNO");
                break;
            case 2: 
                console.log("DOS");
                break;
            case 3: 
                console.log("TRES");
                break;
            case 4: 
                console.log("CUATRO");
                break;
        }   

    }
    
}

valor();

array1.push(3)

valor();

array1.pop()
array1.pop()
array1.pop()

valor();