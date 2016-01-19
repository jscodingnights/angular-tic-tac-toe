let DIMENSION = 3;

function boardLoop(board, fn) {
  for (let row = 0; row < DIMENSION; row++) {
    for (let col = 0; col < DIMENSION; col++) {
      fn(board[row][col], { row, col });
    }
  }
}

let game = {
  /**
   * Create a new board (2D array)
   */
  createBoard() {
    let board = [];
    for (let row = 0; row < DIMENSION; row++) {
      board[row] = [];
      for (let col = 0; col < DIMENSION; col++) {
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
        ...board[row].slice(col+1)
      ],
      ...board.slice(row+1)
    ];
  },

  /**
   * Check a slice of the board for winner
   */
  check(arr) {
    let clone = arr.slice(0);
    let sum = 0;
    while(clone.length) {
      let val = clone.pop();
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
    let winner;

    // Check rows
    winner = board.reduce((hasWon, row) => hasWon || game.check(row), false);

    // Check cols
    let cols = [];
    for (let i = 0; i < DIMENSION; i++) {
      cols.push(board.map(row => row[i]));
    }
    winner = winner || cols.reduce((hasWon, col) => hasWon || game.check(col), false);

    // Check diagonals
    let diagonals = [
      board.map((row, i) => row[i]),
      board.map((row, i) => row[DIMENSION-1-i])
    ];
    winner = winner || diagonals.reduce((hasWon, diagonal) => hasWon || game.check(diagonal), false);

    return winner;
  },

  display(board) {
    let display = '';
    let prevRow;
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

export default game;
