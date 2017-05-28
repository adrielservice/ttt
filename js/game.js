function ttt() {

	var step = 0;
	var playWithComputer = false;

	var cEmpty = "empty";
	var cSmile = "smile";
	var cCool = "cool";
	var emptyBoard = [
					[cEmpty,cEmpty,cEmpty],
					[cEmpty,cEmpty,cEmpty],
					[cEmpty,cEmpty,cEmpty]
				];
	var board = emptyBoard;

	var mySound = new sound("audio/bounce.mp3");

	this.changePlayerMode = function (mode) {
		if (mode) {
			playWithComputer = mode;
		} else {
			playWithComputer = !playWithComputer;	
		}
		
		return playWithComputer;
	}

	this.makeMove = function (x, y, pic, btn, isComputerMove) {
		
		step = step + 1;
		console.log("Step is " + step);

		var btnEl=document.getElementById(btn);
		btnEl.style.display = 'none';

		var picEl=document.getElementById(pic);
		if (step % 2 == 1) {
			picEl.src = "images/smiley.png";
			board[x][y] = cSmile;
		} else{
			picEl.src = "images/Emoji.png";
			board[x][y] = cCool;
		};
		picEl.style.display = 'block';

		mySound.play();

		window.setTimeout(function() {

			var isWinningMove = checkMoveForWinner(); 
			if (isWinningMove) {
				var winner = (isComputerMove) ? "Computer" : "Human Player";
				alert(winner + " wins!");
				restart();
			} else if (step == 9) {
				alert("Cats game!");
				restart();
			} else if (playWithComputer && !isComputerMove) {
				computerMakeMove();
			}

		}, 250)
	}

	function restart () {
		location.reload();
	}

	/*
	 *	Winner detection algorithm
	 */

	function checkForWinnerHorizontally () {

		if (board[0][0] != cEmpty && board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
			return true;
		}

		if (board[1][0] != cEmpty && board[1][0] ==board[1][1] && board[1][1] == board[1][2]) {
			return true;
		}

		if (board[2][0] != cEmpty && board[2][0] == board[2][1] && board[2][1] == board[2][2]) {
			return true;
		}

		return false;
	}

	function checkForWinnerVertically (){
		if (board[0][0] != cEmpty && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
			return true;
		}

		if (board[0][1] != cEmpty && board[0][1] ==board[1][1] && board[1][1] == board[2][1]) {
			return true;
		}

		if (board[0][2] != cEmpty && board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
			return true;
		}

		return false;
	} 

	function checkForWinnerDiagonally (){
		if (board[0][0] != cEmpty && 
			board[0][0] == board[1][1] && 
			board[1][1] == board[2][2]) {
			return true;
		}

		if (board[0][2] != cEmpty && 
			board[0][2] ==board[1][1] && 
			board[1][1] == board[2][0]) {
			return true;
		}

		return false;
	} 

	function checkMoveForWinner() {
		return 
			checkForWinnerHorizontally() ||
			checkForWinnerVertically() ||
			checkForWinnerDiagonally();
	}

	/*
	 *	Computer playing strategy - random next move
	 */

	function findNextFreeCell () {
		var emptyCount = 9 - step;
		if (emptyCount <= 0) {
			return -1;
		}

		var randCellNum = Math.floor(Math.random() * emptyCount);
		var emptyCellCount = 0;
		for (var row = 0; row < 3; row++) {
			for (var column = 0; column < 3; column++) {
				if (board[row][column] == cEmpty) {
					if (emptyCellCount == randCellNum) {
						return 3*row + column;
					} 
					emptyCellCount++;
				}
			};
		};

		return -1;
	}

	function computerMakeMove() {
		var nextCellId = findNextFreeCell();
		if (nextCellId < 0) {
			return;
		}

		var x = Math.floor(nextCellId / 3);
		var y = nextCellId % 3;
		var pic = "pic" + (nextCellId + 1); 
		var btn = "but" + (nextCellId + 1);
		makeMove(x, y, pic, btn, true);
	}

};