import { placeTowerClick } from "./clicks";
import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD } from "./renderers";
import getTiles from "./tiles";
import { calculateEnemyPath, moveEnemies, removeOffscreenEnemies, spawnEnemies } from "./transformers";

const spawnLocation = { x: 135, y: 135 };
const endLocation = { x: 835, y: 635 };

const createInitialGameState = () => ({
  enemySpawnTimer: makeTimer(1000),
  spawnLocation,
  endLocation,
  liveEnemies: [],
  newTowerPlaced: false,
  queueEnemies: [
    {
      color: "green",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 500,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "red",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "orange",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "yellow",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "red",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "orange",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "yellow",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: endLocation,
      targetQueue: [],
    },
    {
      color: "black",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 1000,
      targetLocation: endLocation,
      targetQueue: [],
    },
  ],
  board: getTiles(),
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
      currentState = output.state;
    },
  };
})();

export default gameEngine;
