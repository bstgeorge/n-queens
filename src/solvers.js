/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  //New board instanciated and find max number
  // n = 4;
  var maxCount = (1 - 2**n)/(1-2);
  for (var i = maxCount; i >=0; i--) {
    let num = i;
    binaryBoard = num.toString(2).padStart(n**2, '0');

    let matrix = [];
    //estableshes single board
    for (let j = 0; j < binaryBoard.length; j += n) {
      let rowString = binaryBoard.slice(j, j+n);
      let row = [];
      //estableshes single row
      for (let r = 0; r < rowString.length; r++) {
        row.push(Number(rowString[r]));
      }
      matrix.push(row);
    }
    //create new board isntance
    // console.log('just before new board', matrix)
    board = new Board(matrix)
    //check board soluton
    if(!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) return matrix;
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  for (var i = 0; i < n; i++) {
    solutionCount = solutionCount * (n - i)**2
  }

  //////////////////////////////////////////////////////
  var maxCount = 1 * (1 - 2**n)/(1-2);
  const boardInstance = [];
  //find numbers inbetween, loop
  for (var i = 0; i <= maxCount; i++) {
    binaryBoard = i.toString(2).padStart(n**2);

    let twoDBoard = [];
    for (let j = 0; j < binaryBoard.length; j += n) {
      let rowString = binaryBoard.slice(j, j+n);
      let row = [];
      for (let r = 0; r < rowString.length; r++);{
        row.push(Number(rowString[r]));
      }

      twoDBoard.push(row);
    }

    boardInstance.push(twoDBoard);
  }
  //////////////////////////////////////////////////////


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var maxCount = (1 - 2**n)/(1-2);
  for (var i = maxCount; i >=0; i--) {
    let num = i;
    binaryBoard = num.toString(2).padStart(n**2, '0');

    let matrix = [];
    //estableshes single board
    for (let j = 0; j < binaryBoard.length; j += n) {
      let rowString = binaryBoard.slice(j, j+n);
      let row = [];
      //estableshes single row
      for (let r = 0; r < rowString.length; r++) {
        row.push(Number(rowString[r]));
      }
      matrix.push(row);
    }
    //create new board isntance
    // console.log('just before new board', matrix)
    board = new Board(matrix)
    // check board soluton
    if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
      if(!board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
         return matrix
      }
    }
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
