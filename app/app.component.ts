import {Component} from 'angular2/core';
import game from './game';

@Component({
    selector: 'my-app',
    template: `
    <h1>Tic Tac Toe</h1>
    <div class="board">
        <div *ngFor="#row of board;#rowNo=index" class="row">
            <div *ngFor="#cell of row;#colNo=index" class="cell" (click)="cellClicked(rowNo, colNo)">
                <span class="marker" *ngIf="cell===0">X</span>
                <span class="marker" *ngIf="cell===1">O</span>
            </div>
        </div>
    </div>
    <div class="gameResults" *ngIf="winner===0">Winner: First Player</div>
    <div class="gameResults" *ngIf="winner===1">Winner: Second Player</div>
    <button class="restart" (click)="restart()">Restart</button>`
})

export class AppComponent {
    public currentPlayer = 0;
    public board = game.createBoard();
    public winner;

    restart() {
        this.board = game.createBoard();
        this.winner = null;
        this.currentPlayer = 0;
    }

    cellClicked(row, col) {
        if (this.board[row][col] === 0 || this.board[row][col] === 1 || this.winner != null)
            return;

        this.currentPlayer++;
        this.board[row][col] = this.currentPlayer % 2 ? 0 : 1;

        var checkResult = game.checkBoard(this.board);

        if (checkResult) {
            this.winner = checkResult.winner;
        }
    }
}