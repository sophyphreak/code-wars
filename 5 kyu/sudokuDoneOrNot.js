const doneOrNot = board => {
  for (let row of board) {
    const rowCopy = row.slice();
    rowCopy.sort();
    for (let index = 0; index < rowCopy.length; index++) {
      if (rowCopy[index] !== index + 1) {
        return 'Try again!';
      }
    }
  }
  for (let col = 0; col < 9; col++) {
    const colCopy = board.map((undefined, row) => board[row][col]);
    colCopy.sort();
    for (let index = 0; index < colCopy.length; index++) {
      if (colCopy[index] !== index + 1) {
        return 'Try again!';
      }
    }
  }
  const squaresCopy = [];
  for (let i = 0; i < 9; i++) squaresCopy.push([]);
  board.forEach((row, rowIndex) => {
    row.forEach((val, colIndex) => {
      squaresCopy[Math.floor(rowIndex / 3) + Math.floor(colIndex / 3) * 3].push(
        val
      );
    });
  });
  for (let square of squaresCopy) {
    const squareCopy = square.slice();
    squareCopy.sort();
    for (let index = 0; index < squareCopy.length; index++) {
      if (squareCopy[index] !== index + 1) {
        return 'Try again!';
      }
    }
  }
  return 'Finished!';
};

const assert = require('assert');

assert.equal(
  doneOrNot([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ]),
  'Finished!'
);

assert.equal(
  doneOrNot([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 0, 3, 4, 9],
    [1, 0, 0, 3, 4, 2, 5, 6, 0],
    [8, 5, 9, 7, 6, 1, 0, 2, 0],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 0, 1, 5, 3, 7, 2, 1, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 0, 0, 4, 8, 1, 1, 7, 9]
  ]),
  'Try again!'
);
