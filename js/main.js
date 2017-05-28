var dcol = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'turquoise', 'yellow'];

var game = new ttt();

function makeMove(x, y, pic, btn, isComputerMove) {
	game.makeMove(x, y, pic, btn, isComputerMove);
}

function changePlayerMode (mode) {
	var playerModeLbl = document.getElementById("player_mode");
	var playerModeBtn = document.getElementById("player_but");
	var playerMode = game.changePlayerMode(mode);
	playerModeBtn.value = (playerMode) ? "Play with a human" : "Play with the computer";
	playerModeLbl.textContent = (playerMode) ? "Playing with the computer" : "Playing with a human";
}

function changeColor() {
	changeBgCol();
	changeCellCol();
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

	var params = getAllUrlParams(window.href);
	var strPlayerMode = (params.player_mode == undefined) ? "true" : params.player_mode;
	var playerMode = (strPlayerMode == "true");
	changePlayerMode(playerMode);
}