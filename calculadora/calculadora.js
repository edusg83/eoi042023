var numero1 = '';
var numero2 = '';
var operacionActual = '';
var resultado = '';

// Función para agregar un número o punto al resultado
function agregarNumero(numero) {
  if (operacionActual === '') {
    numero1 += numero;
    document.getElementById('resultado').value = numero1;
  } else {
    numero2 += numero;
    document.getElementById('resultado').value = numero2;
  }
}

// Función para realizar la operación seleccionada
function operacion(op) {
  operacionActual = op;
  document.getElementById('resultado').value = '';
}

// Función para limpiar todo el resultado
function limpiar() {
  numero1 = '';
  numero2 = '';
  operacionActual = '';
  document.getElementById('resultado').value = '';
}

// Función para borrar el último carácter del resultado
function borrar() {
  if (operacionActual === '') {
    numero1 = numero1.slice(0, -1);
    document.getElementById('resultado').value = numero1;
  } else {
    numero2 = numero2.slice(0, -1);
    document.getElementById('resultado').value = numero2;
  }
}

// Función para realizar el cálculo final
function calcular() {
  switch (operacionActual) {
    case '+':
      resultado = parseFloat(numero1) + parseFloat(numero2);
      break;
    case '-':
      resultado = parseFloat(numero1) - parseFloat(numero2);
      break;
    case '*':
      resultado = parseFloat(numero1) * parseFloat(numero2);
      break;
    case '÷':
      resultado = parseFloat(numero1) / parseFloat(numero2);
      break;
  }
  document.getElementById('resultado').value = resultado;
  numero1 = resultado;
  numero2 = '';
  operacionActual = '';
}