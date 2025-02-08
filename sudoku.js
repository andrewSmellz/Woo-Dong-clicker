const cells = document.querySelectorAll(".cell");
const newGameBTN = document.getElementById("newGameBTN");

const rows = 9;
const cols = 9;
const grid = [];

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
      grid[i][j] = cells[index].value;
    }
  }
  printGrid();
}

function printGrid() {
  console.clear();
  for (let j = 0; j < 9; j++) {
    console.log(grid[j]);
  }
}

function newGame() {
  generateBoard();
}

function generateBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) grid[i][j] = 0;
  }
  dfs(0, 0);
  printGrid();
  fillGrid();
}

function dfs(row, column) {
  if (row === 9) return true;
  if (column === 9) return dfs(row + 1, 0);

  let numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let num of numbers) {
    if (checkValid(row, column, num)) {
      grid[row][column] = num;
      if (dfs(row, column + 1)) return true;
      grid[row][column] = 0;
    }
  }

  return false;
}

function fillGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let index = i * 9 + j;
      cells[index].value = grid[i][j];
    }
  }
}

function checkValid(row, column, number) {
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

//this is called a Fisher-Yates Shuffle :)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

cells.forEach((cell) => {
  cell.addEventListener("input", getGrid);
});

newGameBTN.addEventListener("click", newGame);
