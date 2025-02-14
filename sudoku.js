const cells = document.querySelectorAll(".cell");
const easyBtn = document.getElementById("easyDif");
const mediumBtn = document.getElementById("medDif");
const hardBtn = document.getElementById("hardDif");

const rows = 9;
const cols = 9;
let cellsToRemove = 40;
const grid = [];
let puzzle = [];
let solution = [];
let solutionCount = 0;

for (let i = 0; i < rows; i++) {
  grid[i] = [];
  for (let j = 0; j < cols; j++) {
    grid[i][j] = 0;
  }
}

function getGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let index = i * 9 + j;
      grid[i][j] = Number(cells[index].value) || 0;
    }
  }
  checkWin();
}

function checkWin() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] !== solution[i][j]) {
        console.log("not correct yet");
        return;
      }
    }
  }
  alert("you win woohoo");
  cells.forEach((cell) => {
    cell.disabled = true;
  });
}

function printGrid() {
  console.clear();
  for (let j = 0; j < 9; j++) {
    console.log(grid[j]);
  }
}

function newGame() {
  cells.forEach((cell) => {
    cell.disabled = false;
  });
  generateBoard();
}

function generateBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  dfs(0, 0);
  printGrid();
  solution = JSON.parse(JSON.stringify(grid));
  puzzle = JSON.parse(JSON.stringify(grid));
  createPuzzle(puzzle, cellsToRemove);
  fillGrid(puzzle);
}

function dfs(row, column) {
  if (row === 9) return true;
  if (column === 9) return dfs(row + 1, 0);

  let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let num of numbers) {
    if (checkValid(grid, row, column, num)) {
      grid[row][column] = num;
      if (dfs(row, column + 1)) return true;
      grid[row][column] = 0;
    }
  }

  return false;
}

function fillGrid(matrix) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let index = i * 9 + j;
      if (matrix[i][j] !== 0) {
        cells[index].value = matrix[i][j];
        cells[index].disabled = true;
      } else {
        cells[index].value = "";
      }
    }
  }
}

function checkValid(grid, row, column, number) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] == number || grid[i][column] == number) {
      return false;
    }
  }
  let boxRow = Math.floor(row / 3) * 3;
  let boxCol = Math.floor(column / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] == number) {
        return false;
      }
    }
  }
  return true;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createPuzzle(puzzle, removeCount) {
  for (let i = 0; i < removeCount / 2; i++) {
    let randRow;
    let randCol;
    do {
      randRow = Math.floor(Math.random() * 9);
      randCol = Math.floor(Math.random() * 9);
    } while (puzzle[randRow][randCol] === 0);

    let temp1 = puzzle[randRow][randCol];
    let temp2 = puzzle[8 - randRow][8 - randCol];

    puzzle[randRow][randCol] = 0;
    puzzle[8 - randRow][8 - randCol] = 0;

    if (!solvePuzzle(puzzle)) {
      puzzle[randRow][randCol] = temp1;
      puzzle[8 - randRow][8 - randCol] = temp2;
      i--;
    }
  }
}

function solvePuzzle(puzzle) {
  let testPuzzle = JSON.parse(JSON.stringify(puzzle));
  solutionCount = 0;
  countSolutions(testPuzzle, 0, 0);
  return solutionCount === 1;
}

function countSolutions(testPuzzle, row, column) {
  if (row === 9) {
    solutionCount++;
    return;
  }
  if (column === 9) return countSolutions(testPuzzle, row + 1, 0);
  if (testPuzzle[row][column] !== 0)
    return countSolutions(testPuzzle, row, column + 1);

  for (let num = 1; num <= 9; num++) {
    if (checkValid(testPuzzle, row, column, num)) {
      testPuzzle[row][column] = num;
      countSolutions(testPuzzle, row, column + 1);
      if (solutionCount > 1) return;
      testPuzzle[row][column] = 0;
    }
  }
}

function setDifficulty(level) {
  switch (level) {
    case "easy":
      cellsToRemove = 20;
      break;
    case "medium":
      cellsToRemove = 40;
      break;
    case "hard":
      cellsToRemove = 50;
      break;
  }
  console.log(`difficulty is now ${level}`);
}

easyBtn.addEventListener("click", () => setDifficulty("easy"));
mediumBtn.addEventListener("click", () => setDifficulty("medium"));
hardBtn.addEventListener("click", () => setDifficulty("hard"));
easyBtn.addEventListener("click", () => newGame());
mediumBtn.addEventListener("click", () => newGame());
hardBtn.addEventListener("click", () => newGame());
cells.forEach((cell) => {
  cell.addEventListener("input", getGrid);
});
