var tabla;
const prviIgrac = 'O';
const drugiIgrac = 'X';
const pobjednickaKombinacija = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".end").style.display = "none";
    console.log(Array.from(Array(9).keys()));
    tabla = Array.from(Array(9).keys());
  
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(polje) {
    if (typeof tabla[polje.target.id] == 'number') {
        turn(polje.target.id, prviIgrac);
        if (!nerijeseno()) turn(bestSpot(), drugiIgrac);
    }
}

function turn(poljeId, igrac) {
    tabla[poljeId] = igrac;
    document.getElementById(poljeId).innerText = igrac; 
    let pobjeda = pobijediti(tabla, igrac);
    if (pobjeda) kraj(pobjeda);
}
function pobijediti(board, igrac) {
    let plays = board.reduce((a, e, i) =>
        (e === igrac) ? a.concat(i) : a, []);
    let pobjeda = null;
    for (let [index, win] of pobjednickaKombinacija.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            pobjeda = { index: index, igrac: igrac };
            break;
        }
    }
    return pobjeda;
}

function kraj(pobjeda) {
    for (let index of pobjednickaKombinacija[pobjeda.index]) {
        document.getElementById(index).style.backgroundColor =
            pobjeda.igrac == prviIgrac ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    proglasenjePobjednika(pobjeda.igrac == prviIgrac ? "Pobjeda!!!" : "Poraz!!!");
}
function proglasenjePobjednika(neko) {
    document.querySelector(".end").style.display = "block";
    document.querySelector(".end .text").innerText = neko;
}

function praznaPolja() {
    return tabla.filter(s => typeof s == 'number');
}
function bestSpot() {
    console.log(praznaPolja()[0]);
    return praznaPolja()[0];
}

function nerijeseno() {
    if (praznaPolja().length == 0) {

        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener('click', turnClick, false);
        }
        proglasenjePobjednika("Nerijeseno");
        return true;
    }
    return false;
}

