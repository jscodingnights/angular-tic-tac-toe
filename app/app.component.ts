import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
    <h1>Tic Tac Toe</h1>
    <div class="board">
        <div *ngFor="#row of board;#rowNo=index" class="row">
            <div *ngFor="#cell of row;#colNo=index" class="cell" (click)="cellClicked(rowNo, colNo)">
                <span *ngIf="cell===0">X</span>
                <span *ngIf="cell===1">O</span>
            </div>
        </div>
    </div>
    <div class="gameResults" *ngIf="winner===0">Winner: First Player</div>
    <div class="gameResults" *ngIf="winner===1">Winner: Second Player</div>
    <button class="restart" (click)="restart()">Restart</button>
`,
    styles: [`body {
    margin: 0px;
    font-family: "Fira Mono", Arial, Helvetica, sans-serif;
    color: #FFFFFF;
    background-color: #26a69a;
    font-size: 12pt;
}

.board {
    width: 500px;
    height: 500px;
}

.row {
    width: 100%;
    height: 33%;
}

.cell {
    float: left;
    background-color: #ff6e40;
    height: 100%;
    width: 33%;
    outline: 1px solid black;
    position: relative;
}

span {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 100pt;
}

.board {
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.gameResults {
    position: absolute;
    top: 30;
    left: 50%;
    transform: translate(-50%);
}

.restart {
    margin: 0 auto;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    line-height: 150px;
    text-align: center;
    font-size: 20pt;
    color: black;
    background-color: #ffd54f;
}
`]
})

export class AppComponent {
    public currentPlayer = 1;
    public board = game.createBoard();
    public winner;

    restart() {
        this.board = game.createBoard();
        this.winner = null;
        this.currentPlayer = 1;
    }

    cellClicked(row, col) {
        if (this.board[row][col] === 0 || this.board[row][col] === 1 || this.winner)
            return;

        this.currentPlayer++;
        this.board[row][col] = this.currentPlayer % 2 ? 0 : 1;

        var checkResult = game.checkBoard(this.board);

        if (checkResult) {
            this.winner = checkResult.winner;
        }
    }
}

var DIMENSION = 3;

function boardLoop(board, fn) {
    for (var row = 0; row < DIMENSION; row++) {
        for (var col = 0; col < DIMENSION; col++) {
            fn(board[row][col], {row, col});
        }
    }
}

var game = {
    /**
     * Create a new board (2D array)
     */
        createBoard() {
        var board = [];
        for (var row = 0; row < DIMENSION; row++) {
            board[row] = [];
            for (var col = 0; col < DIMENSION; col++) {
                board[row][col] = null;
            }
        }

        return board;
    },

    /**
     * NON-DESTRUCTIVE, PURE function for returning a new board with the
     * given cell updated
     */
    set(board, val, row, col) {
        if (board[row][col] != null) {
            console.warn(`Attempted to set on cell that has a value: row: ${row} col: ${col} value: ${val}`);
            return board;
        }

        return [
            ...board.slice(0, row),
            [
                ...board[row].slice(0, col),
                val,
                ...board[row].slice(col + 1)
            ],
            ...board.slice(row + 1)
        ];
    },

    /**
     * Check a slice of the board for winner
     */
        check(arr) {
        var clone = arr.slice(0);
        var sum = 0;
        while (clone.length) {
            var val = clone.pop();
            if (val == null) {
                return;
            }
            sum += val;
        }
        if (sum === 0 || sum === DIMENSION) {
            return {
                winner: sum / DIMENSION || 0
            };
        }
        return;
    },

    /**
     * Check if there is a winner on the board
     */
        checkBoard(board) {
        var winner;

        // Check rows
        winner = board.reduce((hasWon, row) => hasWon || game.check(row), false);

        // Check cols
        var cols = [];
        for (var i = 0; i < DIMENSION; i++) {
            cols.push(board.map(row => row[i]));
        }
        winner = winner || cols.reduce((hasWon, col) => hasWon || game.check(col), false);

        // Check diagonals
        var diagonals = [
            board.map((row, i) => row[i]),
            board.map((row, i) => row[DIMENSION - 1 - i])
        ];
        winner = winner || diagonals.reduce((hasWon, diagonal) => hasWon || game.check(diagonal), false);

        return winner;
    },

    display(board) {
        var display = '';
        var prevRow;
        boardLoop(board, (val, coord) => {
            if (coord.row !== prevRow) {
                display += '\n';
                prevRow = coord.row;
            }
            display += `${val == null ? '-' : val} `;
        });
        display += '\n';
        console.log(display);
    }
};