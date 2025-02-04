const cells = document.querySelectorAll('.cell');
const newGameBTN = document.getElementById("newGameBTN");


let grid = [];
let correctGrid = [];

function getGrid(){
    grid=[];
    for(let i=0; i<9; i++){
        let row=[];
        for (let j = 0; j < 9; j++) {
            let index = i * 9 + j;
            row.push(cells[index].value);
        }
        grid.push(row);
    }
    printGrid()
}


function printGrid(){
    console.clear();    
    for(let j=0; j<9; j++){
        console.log(grid[j]);
    }   
}


function newGame(){
    console.log("new game begin");
}


cells.forEach(cell =>{
    cell.addEventListener("input",getGrid);
});

newGameBTN.addEventListener("click",newGame);