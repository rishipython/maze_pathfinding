
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 20;
const ROWS = 25;
const COLS = 25;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

let maze = [];

function initMaze() {
    maze = [];
    for(let i = 0; i < ROWS; i++) {
        maze[i] = [];
        for(let j = 0; j < COLS; j++) {
            maze[i][j] = 1; // 1 represents wall
        }
    }
}

function generateMaze() {
    initMaze();
    // TODO: Implement recursive backtracking maze generation
    drawMaze();
}

function solveMaze() {
    const algorithm = document.getElementById('algorithm').value;
    if(algorithm === 'bfs') {
        // TODO: Implement BFS
    } else {
        // TODO: Implement DFS
    }
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLS; j++) {
            ctx.fillStyle = maze[i][j] ? 'black' : 'white';
            ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

// Initialize on load
generateMaze();
