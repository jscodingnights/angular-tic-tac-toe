# angular-tic-tac-toe

Project initialized with Angular following the [TypeScript kickstarter](https://angular.io/docs/ts/latest/quickstart.html).  If you wish to use this repo and *not* use TypeScript, you'll have to modify the /app component as well as modify the .gitignore to not omit JS files.  Check out the [JS kickstarter](https://angular.io/docs/js/latest/quickstart.html).  If you want to use Dart, you're weird.

### Task: Implement a Tic-Tac-Toe board using Angular 2.
How the app looks is up to you.  Consider the following as a loose thought for what your component structure might look like:

````
--- Do not copy-paste this code ---

<App>
    <Title />

    // New Game:
    <CreateGame />

    // Game in Progress:
    <Game>
        <Players>
            <Player />
            <Player />
        </Players>
        <Board>
            <Cell />
            // ... (9 cells per board)
        </Board>
        <MovesLog />
    </Game>

    // Game Over:
    <GameOver />
</App>
````

#### Basic Features

1. Implement the game board.  The `game.js` file is provided to handle basic board functionality: creation, setting a cell value and checking for a winner.  Note: X's are represented by a `1` in the game board while O's are a `0`.  Empty cells are `null`.
2. Clicking or tapping on a cell should alternately place X's and O's on the game board.  Clicking or tapping on a cell with a value already in it should do nothing.
3. Implement the win state.  Display the winner of the game and a reset button to start again.


#### Bonus Features
* Prompt the players for their names rather than using just X and O.
* Add a moves log to the bottom of the game screen.  Show the list of moves made by each player of the form `NAME (X/O) : ROW,COL`
* Add a player statistics.  Number of wins, total number of games, etc.
* Game history log


# Usage
````
git clone https://github.com/jscodingnights/angular-tic-tac-toe.git
cd angular-tic-tac-toe
npm install
npm start
````

#Game.js
I've provided basic game logic so everyone can focus on Angular.  You may move and modify the game file to suit your needs!

###Usage
```javascript
import game from '../game';

// Create a new board
let board = game.createBoard();

// Make some moves (NON-DESTRUCTIVE, RETURNS NEW BOARD STATE)
// Pass 1 for X's, 0 for O's.
board = game.set(board, 0, 0, 0); // O placed at coord row 0, col 0
board = game.set(board, 1, 1, 0); // X placed at coord row 1, col 0
board = game.set(board, 0, 0, 1); // O placed at coord row 0, col 1

// Check to see if anyone has won
let winState = game.checkBoard(board);
if (winState) {
    alert('Winner: ', winState.winner ? 'X' : 'O');
}

// Display the board state to the console
game.display(board);
```

### Game API

###`createBoard()`
Creates a new game board.  This is a 2D array where the top level is an array of rows, so each child array is a column, so indexed via `board[row][column]`.  All cells initialized to null.

###`set(board, [0 or 1], row, col)`
Sets the value at the given row and column in the new board state to the given value (0 or 1).

###`checkBoard(board)`
Returns undefined if there is no winner, otherwise returns `{ winner: 0/1 }`.
