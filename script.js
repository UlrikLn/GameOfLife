"use strict";

const rows = 30;
const cols = 50;
let grid = [];
let intervalId;

function createGrid() {
    const gridContainer = document.getElementById('grid-container');
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            gridContainer.appendChild(cell);
            grid[i][j] = 0;
            cell.addEventListener('click', toggleCell);
        }
        gridContainer.appendChild(document.createElement('br'));
    }
}

function toggleCell() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    if (grid[row][col] === 0) {
        this.classList.add('alive');
        grid[row][col] = 1;
    } else {
        this.classList.remove('alive');
        grid[row][col] = 0;
    }
}

function startGame() {
    intervalId = setInterval(updateGrid, 100);
}

function stopGame() {
    clearInterval(intervalId);
}

function updateGrid() {
    const nextGrid = [];
    for (let i = 0; i < rows; i++) {
        nextGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j] === 1) {
                if (neighbors < 2 || neighbors > 3) {
                    nextGrid[i][j] = 0;
                } else {
                    nextGrid[i][j] = 1;
                }
            } else {
                if (neighbors === 3) {
                    nextGrid[i][j] = 1;
                } else {
                    nextGrid[i][j] = 0;
                }
            }
        }
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.querySelector(`[data-row='${i}'][data-col='${j}']`);
            if (nextGrid[i][j] === 1) {
                cell.classList.add('alive');
            } else {
                cell.classList.remove('alive');
            }
            grid[i][j] = nextGrid[i][j];
        }
    }
}

function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol];
            }
        }
    }
    return count;
}

createGrid();
