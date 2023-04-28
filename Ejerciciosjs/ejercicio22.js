var nombre = document.getElementById('nombre').value;
var email = document.getElementById('email').value;
var provincia = document.getElementsByName('provincia').value;
function clickfunction(){
	document.write(nombre + email + provincia);
}