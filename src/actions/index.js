export const INITIALIZE_GRID = "INITIALIZE_GRID";
export const ANIMATE_GAME = "ANIMATE_GAME";
export const MODIFY_GRID = "MODIFY_GRID";
export const CAN_MODIFY = "CAN_MODIFY";
export const CHOOSE_PRESET = "CHOOSE_PRESET";
export const RANDOMIZE = "RANDOMIZE";

export const initializeGridAction = (gridX, gridY) => dispatch => {
  dispatch({ type: INITIALIZE_GRID, payload: { gridX, gridY } });
};

export const animateGameAction = () => dispatch => {
  dispatch({ type: ANIMATE_GAME });
};

export const modifyGridAction = (modifyRow, modifyCol) => dispatch => {
  dispatch({ type: MODIFY_GRID, payload: { modifyRow, modifyCol } });
};

export const setConfigurationAction = config => dispatch => {
  dispatch({ type: CHOOSE_PRESET, payload: config });
};

export const randomizeGridAction = () => dispatch => {
  dispatch({ type: RANDOMIZE });
};
