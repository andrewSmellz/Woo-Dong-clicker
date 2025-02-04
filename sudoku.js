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
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let index = 0;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const trueRow = boxRow * 3 + row;
          const trueCol = boxCol * 3 + col;
          grid[trueRow][trueCol] = numbers[index];
          index++;
        }
      }
    }
  }
  printGrid();
  fillGrid();
}

function fillGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let index = i * 9 + j;
      cells[index].value = grid[i][j];
    }
  }
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
