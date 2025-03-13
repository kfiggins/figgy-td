import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD } from "./renderers";
import getTiles from "./tiles";
import { moveEnemies, removeOffscreenEnemies, spawnEnemies } from "./transformers";

const spawnLocation = { x: 135, y: 135 };
const endLocation = { x: 835, y: 635 };

const createInitialGameState = () => ({
  enemySpawnTimer: makeTimer(1000),
  spawnLocation,
  endLocation,
  liveEnemies: [],
  queueEnemies: [
    {
      color: "green",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 500,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "red",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "orange",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "yellow",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "red",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "orange",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "yellow",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 200,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 335 },
        { x: 135, y: 335 },
        { x: 135, y: 535 },
        { x: 850, y: 535 },
        endLocation,
      ],
    },
    {
      color: "black",
      x: spawnLocation.x,
      y: spawnLocation.y,
      width: 30,
      height: 30,
      speed: 1000,
      targetLocation: { x: 850, y: 135 },
      targetQueue: [
        { x: 850, y: 600 },
        { x: 135, y: 100 },
        { x: 1000, y: 500 },
        { x: 435, y: 135 },
        { x: 635, y: 335 },
        { x: 435, y: 535 },
        { x: 135, y: 335 },
        { x: 435, y: 135 },
        { x: 635, y: 335 },
        { x: 435, y: 535 },
        { x: 135, y: 335 },
        { x: 435, y: 135 },
        endLocation,
      ],
    },
  ],
  tiles: getTiles(),
});

const drawScreen = (context) => {
  pipe(drawBackground, drawTiles, drawEnemies, drawHUD)(context);
};

const update = (context) => {
  return pipe(spawnEnemies, moveEnemies, removeOffscreenEnemies)(context);
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
    update: ({ deltaTime, ctx }) => {
      currentState = update({ ...currentState, deltaTime });
      return gameEngine.getState();
    },
  };
})();

export default gameEngine;
