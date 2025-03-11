import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD } from "./renderers";
import getTiles from "./tiles";

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

const drawScreen = (ctx, gameState) => {
  const context = { canvas: { ctx }, gameState };

  pipe(drawBackground, drawTiles, drawEnemies, drawHUD)(context);
};

const spawnEnemies = (context) => {
  const { enemySpawnTimer, queueEnemies, liveEnemies, deltaTime } = context;

  const shouldSpawn = enemySpawnTimer(deltaTime);

  if (shouldSpawn && queueEnemies.length > 0) {
    const [newEnemy, ...remainingQueue] = queueEnemies;

    return { ...context, queueEnemies: remainingQueue, liveEnemies: [...liveEnemies, newEnemy] };
  }
  return context;
};

const moveEnemies = (context) => {
  const { deltaTime, liveEnemies } = context;
  const secondsPassed = deltaTime / 1000;

  const updatedEnemies = liveEnemies.map((enemy) => ({
    ...enemy,
    x: enemy.x - enemy.speed * secondsPassed,
  }));

  return { ...context, liveEnemies: updatedEnemies };
};

const removeOffscreenEnemies = (context) => {
  const { liveEnemies } = context;

  const visibleEnemies = liveEnemies.filter((enemy) => enemy.x + enemy.width > 0);

  return { ...context, liveEnemies: visibleEnemies };
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
    drawScreen: (ctx) => drawScreen(ctx, currentState),
    update: ({ deltaTime, ctx }) => {
      currentState = update({ ...currentState, deltaTime });
      return gameEngine.getState();
    },
  };
})();

export default gameEngine;
