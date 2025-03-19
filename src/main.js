import { initialState } from "@configs";
import { advanceGameState, createStateManager, initializeCanvasEventListeners, renderGame } from "@helpers";

const stateManager = createStateManager(initialState);
initializeCanvasEventListeners(stateManager);

const gameLoop = (timestamp) => {
  const currentState = stateManager.getState();
  const nextState = advanceGameState(currentState, timestamp);

  stateManager.setState(nextState);
  renderGame(nextState);
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
