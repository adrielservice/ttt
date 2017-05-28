var dcol = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'turquoise', 'yellow'];

var game = new ttt();

function makeMove(x, y, pic, btn, isComputerMove) {
	game.makeMove(x, y, pic, btn, isComputerMove);
}

function changePlayerMode (mode) {
	var playerModeBtn = document.getElementById("player_but");
	var playerMode = game.changePlayerMode(mode);
	playerModeBtn.value = (playerMode) ? "Play with a human" : "Play with the computer";
}

function changeColor() {
	changeBgCol();
	window.setTimeout(function() {
		changeCellCol();
	}, 100);
}

function changeBgCol() {
	var bodo=document.getElementById('bod');
	bodo.style.backgroundColor = dcol[Math.floor(Math.random() * dcol.length)];
}

function changeCellCol() {
	var color = dcol[Math.floor(Math.random() * dcol.length)];

	var cells = document.getElementById("tbl").getElementsByTagName("td");
	for (var i = 0; i < cells.length; i++) {
		cells[i].style.backgroundColor = color;
		cells[i].style.height = cells[i].clientWidth;
	}
	var buttons = document.getElementById("tbl").getElementsByTagName("input");
	for (var i = 0; i < cells.length; i++) {
		buttons[i].style.backgroundColor = color;
	}
}

window.onresize = function(event) {
	changeCellCol();
};

window.onload = function(evnet) {
	changeColor();
	changePlayerMode(true);
}