# Maze Pathfinding Visualization

## Project Summary
A web-based maze generation and pathfinding visualization tool that demonstrates different search algorithms.

## Tasks
- [x] Project setup and structure
- [x] Basic Flask application setup
- [x] HTML canvas and UI controls
- [ ] Implement maze generation algorithm
- [ ] Implement BFS pathfinding
- [ ] Implement DFS pathfinding
- [ ] Add visualization animations

## Setup Instructions
1. Navigate to project directory: `cd /Users/rishi/Desktop/Work/maze_pathfinding`
2. Activate virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/Mac: `source venv/bin/activate`
3. Install dependencies: `pip install flask`
4. Run application: `python app.py`
5. Open browser to: `http://localhost:5000`

## Dependencies
- Python 3.8+
- Flask

## TODO Items
### Maze Generation
- Implement recursive backtracking algorithm in maze.js
- Add wall placement validation
- Ensure maze is solvable

### Pathfinding Algorithms
- Implement BFS with queue data structure
- Implement DFS with stack data structure
- Add path visualization
- Add visited cells highlighting

### UI Improvements
- Add speed control for visualization
- Add reset button
- Add step-by-step execution option

## Resources
- [Maze Generation Algorithm](https://en.wikipedia.org/wiki/Maze_generation_algorithm)
- [BFS Algorithm](https://en.wikipedia.org/wiki/Breadth-first_search)
- [DFS Algorithm](https://en.wikipedia.org/wiki/Depth-first_search)

## Update History
- 2025-06-21 20:54:42: Initial project setup
