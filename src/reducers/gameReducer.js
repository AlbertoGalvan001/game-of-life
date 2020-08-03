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

const checkNeighbors = (rowIndex, colIndex, x, y, arr) => {
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

const deadOrAlive = (count, status) => {
  if (count >= 2) {
    //alive if alive otherwise remains dead
    if (count === 3) {
      //alive alive alive!
      status = true;
    }

    if (count > 3) {
      //dead
      status = false;
    }
  } else {
    // dead as well
    status = false;
  }
  return status;
};

const initializeGrid = (gridX, gridY, canRandomizeGrid = false) => {
  const gridMatrix = [];
  for (let i = 0; i < gridX; i++) {
    gridMatrix.push(new Array(gridY));
    for (let j = 0; j < gridY; j++) {
      let randomStatus = Math.floor(Math.random() * 2);
      if (canRandomizeGrid) {
        gridMatrix[i][j] = {
          alive: randomStatus
        };
      } else {
        gridMatrix[i][j] = {
          alive: false
        };
      }
    }
  }
  return gridMatrix;
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_GRID:
      const { gridX, gridY } = action.payload;

      return {
        ...state,
        grid1: initializeGrid(gridX, gridY),
        swapGrid: true,
        x: gridX,
        y: gridY
      };

    case ANIMATE_GAME:
      let currentGrid = null;
      let nextGrid = [];

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }
      state[currentGrid].forEach((currentRow, rowIndex) => {
        nextGrid.push([]);
        currentRow.forEach((currentColumn, colIndex) => {
          let count = 0;
          const cellBool = checkNeighbors(
            rowIndex,
            colIndex,
            state.x,
            state.y,
            state[currentGrid]
          );
          cellBool.forEach(val => {
            if (val) {
              //counts number of true adjacent cells
              count++;
            }
          });
          nextGrid[rowIndex].push({
            alive: deadOrAlive(count, currentColumn.alive)
          });
        });
      });

      if (state.swapGrid) {
        return {
          ...state,
          grid2: nextGrid,
          swapGrid: false
        };
      } else {
        return {
          ...state,
          grid1: nextGrid,
          swapGrid: true
        };
      }
    case MODIFY_GRID: {
      const { modifyRow, modifyCol } = action.payload;
      let currentGrid = null;
      let nextGrid = [];

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }

      for (let i = 0; i < state[currentGrid].length; i++) {
        nextGrid.push([]);
        for (let j = 0; j < state[currentGrid].length; j++) {
          if (i === modifyRow && j === modifyCol) {
            nextGrid[i].push({ alive: !state[currentGrid][i][j].alive });
          } else {
            nextGrid[i].push({ alive: state[currentGrid][i][j].alive });
          }
        }
      }
      return {
        ...state,
        [currentGrid]: nextGrid
      };
      // const newGrid = grid.map((row, key) => {
      //   if (key === x) {
      //     return row.map((item, colKey) => {
      //       if (colKey == y) {
      //         return item === 0 ? 1 : 0;
      //       } else {
      //         return item;
      //       }
      //     });
      //   } else {
      //     return row;
      //   }
      // });
      // currentGrid(newGrid);
    } // this closes animate game

    case CHOOSE_PRESET: {
      let currentGrid = null;

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }
      const presetGrid = initializeGrid(state.x, state.y);

      switch (action.payload) {
        case "box":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 1
          ] = {
            alive: true
          };
          break;

        case "beehive":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) - 1
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 2
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][
            Math.floor(state.y / 2) + 2
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 3][
            Math.floor(state.y / 2) + 1
          ] = {
            alive: true
          };
          break;

        case "boat":
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2)][Math.floor(state.y / 2) + 1] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][Math.floor(state.y / 2)] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 1][
            Math.floor(state.y / 2) + 2
          ] = {
            alive: true
          };
          presetGrid[Math.floor(state.x / 2) + 2][
            Math.floor(state.y / 2) + 1
          ] = {
            alive: true
          };
          break;
        default:
          break;
      } // this closes choose preset action payload
      return {
        ...state,
        [currentGrid]: presetGrid
      };
    } // this closes choose preset

    case RANDOMIZE: {
      const randomGrid = initializeGrid(state.x, state.y, true);
      let currentGrid;

      if (state.swapGrid) {
        currentGrid = "grid1";
      } else {
        currentGrid = "grid2";
      }

      return {
        ...state,
        [currentGrid]: randomGrid
      };
    }

    default:
      return state;
  }
}; // this closes game reducer

export default gameReducer;
