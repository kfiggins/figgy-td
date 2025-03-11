import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD } from "./renderers";
import getTiles from "./tiles";
import { moveEnemies, removeOffscreenEnemies, spawnEnemies } from "./transformers";

const createInitialGameState = () => ({
  enemySpawnTimer: makeTimer(1000),
  liveEnemies: [],
  queueEnemies: [
    {
      color: "red",
      x: 800,
      y: 150,
      width: 30,
      height: 30,
      speed: 140,
    },
    {
      color: "orange",
      x: 800,
      y: 200,
      width: 30,
      height: 30,
      speed: 90,
    },
    {
      color: "yellow",
      x: 800,
      y: 250,
      width: 30,
      height: 30,
      speed: 100,
    },
    {
      color: "green",
      x: 800,
      y: 350,
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
