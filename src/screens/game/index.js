import { placeTowerClick } from "./clicks";
import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD } from "./renderers";
import getBoard from "./board";
import { calculateEnemyPath, moveEnemies, removeOffscreenEnemies, spawnEnemies } from "./transformers";

const endLocation = { x: 885, y: 685 };

const createInitialGameState = () => ({
  enemySpawnTimer: makeTimer(1000),
  endLocation,
  liveEnemies: [],
  newTowerPlaced: false,
  queueEnemies: [
    {
      color: "green",
      width: 10,
      height: 10,
      speed: 60,
    },
    {
      color: "red",
      width: 15,
      height: 30,
      speed: 60,
    },
    {
      shape: "circle",
      color: "orange",
      width: 30,
      height: 30,
      speed: 60,
    },
    {
      color: "yellow",
      width: 40,
      height: 10,
      speed: 60,
    },
    {
      color: "red",
      width: 30,
      height: 30,
      speed: 60,
    },
    {
      color: "orange",
      width: 30,
      height: 30,
      speed: 60,
    },
    {
      color: "yellow",
      width: 30,
      height: 30,
      speed: 60,
    },
    {
      color: "black",
      width: 30,
      height: 30,
      speed: 60,
    },
  ],
  board: getBoard(),
});

const drawScreen = (context) => {
  pipe(drawBackground, drawTiles, drawEnemies, drawHUD)(context);
};

const update = (context) => {
  return pipe(spawnEnemies, calculateEnemyPath, moveEnemies, removeOffscreenEnemies)(context);
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
