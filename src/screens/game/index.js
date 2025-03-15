import { placeTowerClick } from "./clicks";
import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD, drawBullets } from "./renderers";
import getBoard from "./board";
import { calculateEnemyPath, moveEnemies, createTowerBullets, spawnEnemies, moveTowerBullets } from "./transformers";

const createInitialGameState = () => ({
  towerBullets: [],
  enemySpawnTimer: makeTimer(1000),
  liveEnemies: [],
  newTowerPlaced: false,
  queueEnemies: [
    {
      id: 1,
      color: "green",
      width: 10,
      height: 10,
      speed: 60,
      health: 100,
    },
    {
      id: 2,
      color: "red",
      width: 15,
      height: 30,
      speed: 60,
      health: 100,
    },
    {
      id: 3,
      shape: "circle",
      color: "orange",
      width: 30,
      height: 30,
      speed: 60,
      health: 100,
    },
    {
      id: 4,
      color: "yellow",
      width: 40,
      height: 10,
      speed: 60,
      health: 100,
    },
    {
      id: 5,
      color: "red",
      width: 30,
      height: 30,
      speed: 60,
      health: 100,
    },
    {
      id: 6,
      color: "orange",
      width: 30,
      height: 30,
      speed: 60,
      health: 100,
    },
    {
      id: 7,
      color: "yellow",
      width: 30,
      height: 30,
      speed: 60,
      health: 100,
    },
    {
      id: 8,
      color: "black",
      width: 30,
      height: 30,
      speed: 60,
      health: 100,
    },
  ],
  board: getBoard(),
});

const drawScreen = (context) => {
  pipe(drawBackground, drawTiles, drawBullets, drawEnemies, drawHUD)(context);
};

const update = (context) => {
  return pipe(spawnEnemies, calculateEnemyPath, moveEnemies, moveTowerBullets, createTowerBullets)(context);
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
