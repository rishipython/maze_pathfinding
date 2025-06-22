
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const CELL_SIZE = 20;
const ROWS = 25;
const COLS = 25;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

let maze = [];
let visitedCells = new Set();
let path = [];

// Cell states
const WALL = 1;
const PATH = 0;
const START = 2;
const END = 3;
const VISITED = 4;

function initMaze() {
    maze = [];
    for(let i = 0; i < ROWS; i++) {
        maze[i] = [];
        for(let j = 0; j < COLS; j++) {
            maze[i][j] = WALL;
        }
    }
}

function generateMaze() {
    initMaze();
    const startRow = 1;
    const startCol = 1;
    recursiveBacktrack(startRow, startCol);
    
    // Set start and end points
    maze[1][1] = START;
    maze[ROWS-2][COLS-2] = END;
    
    drawMaze();
}

function recursiveBacktrack(row, col) {
    maze[row][col] = PATH;
    
    // Define possible directions: [row, col]
    const directions = [
        [-2, 0],  // Up
        [2, 0],   // Down
        [0, -2],  // Left
        [0, 2]    // Right
    ];
    
    // Shuffle directions
    directions.sort(() => Math.random() - 0.5);
    
    for(let [dRow, dCol] of directions) {
        const newRow = row + dRow;
        const newCol = col + dCol;
        
        if(isValidCell(newRow, newCol) && maze[newRow][newCol] === WALL) {
            // Carve path by setting middle cell to PATH
            maze[row + dRow/2][col + dCol/2] = PATH;
            recursiveBacktrack(newRow, newCol);
        }
    }
}

function isValidCell(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
}

async function solveMaze() {
    visitedCells.clear();
    path = [];
    const algorithm = document.getElementById('algorithm').value;
    
    const start = [1, 1];
    const end = [ROWS-2, COLS-2];
    
    if(algorithm === 'bfs') {
        await bfs(start, end);
    } else {
        await dfs(start, end);
    }
}

async function bfs(start, end) {
    const queue = [[start]];
    visitedCells.clear();
    
    while(queue.length > 0) {
        const currentPath = queue.shift();
        const [row, col] = currentPath[currentPath.length - 1];
        
        if(row === end[0] && col === end[1]) {
            path = currentPath;
            drawMaze();
            return true;
        }
        
        const directions = [[-1,0], [1,0], [0,-1], [0,1]];
        
        for(let [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if(isValidCell(newRow, newCol) && 
               maze[newRow][newCol] !== WALL &&
               !visitedCells.has(`${newRow},${newCol}`)) {
                
                visitedCells.add(`${newRow},${newCol}`);
                queue.push([...currentPath, [newRow, newCol]]);
                
                if(maze[newRow][newCol] !== START && 
                   maze[newRow][newCol] !== END) {
                    maze[newRow][newCol] = VISITED;
                }
                
                await new Promise(resolve => setTimeout(resolve, 50));
                drawMaze();
            }
        }
    }
    return false;
}

async function dfs(start, end) {
    const stack = [[start]];
    visitedCells.clear();
    
    while(stack.length > 0) {
        const currentPath = stack.pop();
        const [row, col] = currentPath[currentPath.length - 1];
        
        if(row === end[0] && col === end[1]) {
            path = currentPath;
            drawMaze();
            return true;
        }
        
        const directions = [[-1,0], [1,0], [0,-1], [0,1]];
        
        for(let [dRow, dCol] of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            
            if(isValidCell(newRow, newCol) && 
               maze[newRow][newCol] !== WALL &&
               !visitedCells.has(`${newRow},${newCol}`)) {
                
                visitedCells.add(`${newRow},${newCol}`);
                stack.push([...currentPath, [newRow, newCol]]);
                
                if(maze[newRow][newCol] !== START && 
                   maze[newRow][newCol] !== END) {
                    maze[newRow][newCol] = VISITED;
                }
                
                await new Promise(resolve => setTimeout(resolve, 50));
                drawMaze();
            }
        }
    }
    return false;
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cells
    for(let i = 0; i < ROWS; i++) {
        for(let j = 0; j < COLS; j++) {
            switch(maze[i][j]) {
                case WALL:
                    ctx.fillStyle = 'black';
                    break;
                case PATH:
                    ctx.fillStyle = 'white';
                    break;
                case START:
                    ctx.fillStyle = 'green';
                    break;
                case END:
                    ctx.fillStyle = 'red';
                    break;
                case VISITED:
                    ctx.fillStyle = '#ADD8E6'; // Light blue
                    break;
            }
            ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
    
    // Draw solution path
    if(path.length > 0) {
        ctx.beginPath();
        ctx.moveTo(path[0][1] * CELL_SIZE + CELL_SIZE/2, 
                   path[0][0] * CELL_SIZE + CELL_SIZE/2);
        
        for(let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i][1] * CELL_SIZE + CELL_SIZE/2,
                      path[i][0] * CELL_SIZE + CELL_SIZE/2);
        }
        
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Initialize on load
generateMaze();
