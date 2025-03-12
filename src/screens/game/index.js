import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD } from "./renderers";
import getTiles from "./tiles";
import { moveEnemies, removeOffscreenEnemies, spawnEnemies } from "./transformers";

const createInitialGameState = () => ({
  enemySpawnTimer: makeTimer(1000),
  spawnLocation: { x: 135, y: 135 },
  endLocation: { x: 835, y: 635 },
  liveEnemies: [],
  queueEnemies: [
    {
      color: "red",
      x: 135,
      y: 135,
      width: 30,
      height: 30,
      speed: 140,
    },
    {
      color: "orange",
      x: 135,
      y: 135,
      width: 30,
      height: 30,
      speed: 90,
    },
    {
      color: "yellow",
      x: 135,
      y: 135,
      width: 30,
      height: 30,
      speed: 100,
    },
    {
      color: "green",
      x: 135,
      y: 135,
      width: 30,
      height: 30,
      speed: 200,
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
