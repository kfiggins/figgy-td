import { placeTowerClick } from "./clicks";
import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD, drawBullets } from "./renderers";
import getBoard from "./board";
import { calculateEnemyPath, moveEnemies, createTowerBullets, spawnEnemies, moveTowerBullets, scheduleWaves } from "./transformers";

const createInitialGameState = () => ({
  towerBullets: [],
  enemySpawnTimer: makeTimer(1000),
  liveEnemies: [],
  newTowerPlaced: false,
  queueEnemies: [],
  board: getBoard(),
});

const drawScreen = (context) => {
  pipe(drawBackground, drawTiles, drawBullets, drawEnemies, drawHUD)(context);
};

const update = (context) => {
  return pipe(scheduleWaves, spawnEnemies, calculateEnemyPath, moveEnemies, moveTowerBullets, createTowerBullets)(context);
};

const gameEngine = (() => {
  let currentState = createInitialGameState();

  return {
    getState: () => JSON.parse(JSON.stringify(currentState)),
    resetGame: () => {
      currentState = createInitialGameState();
      return gameEngine.getState();
    },
    drawScreen: (ctx) => drawScreen({ canvas: { ctx }, gameState: currentState }),
    update: (deltaTime) => {
      currentState = update({ ...currentState, deltaTime });
      return gameEngine.getState();
    },
    handleClick: (x, y) => {
      const output = pipe(placeTowerClick)({ x, y, state: currentState });
      if (output) {
        currentState = output.state;
      }
    },
  };
})();

export default gameEngine;
