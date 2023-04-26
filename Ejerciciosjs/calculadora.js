function display(val) {
    document.getElementById('resultado').value += val;
}
function clearScreen() {
    document.getElementById('resultado').value = "";
}
function solve() {
    var x = document.getElementById('resultado').value;
    var y = eval(x);
    document.getElementById('resultado').value = y;
    return y;
}
