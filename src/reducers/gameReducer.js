import {
  INITIALIZE_GRID,
  ANIMATE_GAME,
  MODIFY_GRID,
  CHOOSE_PRESET,
  RANDOMIZE
} from "../actions";

const initialState = {
  grid1: [],
  grid2: [],
  swapGrid: false,
  x: 0,
  Y: 0
};

const checkAdjacentCells = (rowIndex, colIndex, x, y, arr) => {
  const cells = [
    [rowIndex - 1, colIndex - 1],
    [rowIndex - 1, colIndex],
    [rowIndex - 1, colIndex + 1],
    [rowIndex, colIndex - 1],
    [rowIndex, colIndex + 1],
    [rowIndex + 1, colIndex - 1],
    [rowIndex + 1, colIndex],
    [rowIndex + 1, colIndex + 1]
  ];

  cells.forEach((cell, index) => {
    if (cell[0] >= 0 && cell[0] < x && cell[1] >= 0 && cell[1] < y) {
      cells[index] = arr[cell[0]][cell[1]].alive;
    } else {
      cells[index] = false;
    }
  });
  return cells;
};
