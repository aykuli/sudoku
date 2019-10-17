function saveEmptyPositions (matrix) {
  // Create an array to save the positions
  var emptyPositions = [];

  // Check every square in the puzzle for a zero
  for(var i = 0; i < matrix.length; i++) {
    for(var j = 0; j < matrix[i].length; j++) {
      // If a zero is found, save that position
      if(matrix[i][j] === 0) {
        emptyPositions.push([i, j]);
      }
    }
  }

  // Return the positions matrix
  return emptyPositions;
}

function checkRow(matrix, row, value) {
  // Iterate through every value in the row
  for(var i = 0; i < matrix[row].length; i++) {
    // If a match is found, return false
    if(matrix[row][i] === value) {
      return false;
    }
  }
  // If no match was found, return true
  return true;
}

function checkColumn(matrix, column, value) {
  // Iterate through each value in the column
  for(var i = 0; i < matrix.length; i++) {
    // If a match is found, return false
    if(matrix[i][column] === value) {
      return false;
    }
  }
  // If no match was found, return true
  return true;
}

function check3x3Square(matrix, column, row, value) {
  // Save the upper left corner
  var columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

  // Find the left-most column
  while(column >= columnCorner + squareSize) {
    columnCorner += squareSize;
  }

  // Find the upper-most row
  while(row >= rowCorner + squareSize) {
    rowCorner += squareSize;
  }

  // Iterate through each row
  for(var i = rowCorner; i < rowCorner + squareSize; i++) {
    // Iterate through each column
    for(var j = columnCorner; j < columnCorner + squareSize; j++) {
      // Return false is a match is found
      if(matrix[i][j] === value) {        
        return false;
      }
    }
  }
  // If no match was found, return true
  return true;
}

function checkValue(matrix, column, row, value) {
  if(checkRow(matrix, row, value) &&
    checkColumn(matrix, column, value) &&
    check3x3Square(matrix, column, row, value)) {
    return true;
  } else {
    return false;
  }
}

function solvePuzzle(matrix, emptyPositions) {
  // Variables to track our position in the solver
  var limit = 9,
      i, row, column, value, found;
  for(i = 0; i < emptyPositions.length;) {
    row = emptyPositions[i][0];
    column = emptyPositions[i][1];
    // Try the next value
    value = matrix[row][column] + 1;
    // Was a valid number found?
    found = false;
    // Keep trying new values until either the limit
    // was reached or a valid value was found
    while(!found && value <= limit) {
      // If a valid value is found, mark found true,
      // set the position to the value, and move to the
      // next position
      if(checkValue(matrix, column, row, value)) {
        found = true;
        matrix[row][column] = value;
        i++;
      } 
      // Otherwise, try the next value
      else {
        value++;
      }
    }
    // If no valid value was found and the limit was
    // reached, move back to the previous position
    if(!found) {
      matrix[row][column] = 0;
      i--;
    }
  }

  // return the solution
  return matrix;
}

module.exports = function solveSudoku(matrix) {
  var emptyPositions = saveEmptyPositions(matrix);

  return solvePuzzle(matrix, emptyPositions);
}
