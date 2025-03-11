import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawEnemies, drawHUD, drawTiles } from "./renderers";
import getTiles from "./tiles";

const initialGameState = {
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
};

const drawScreen = (ctx, gameState) => {
  pipe(drawBackground, drawTiles, drawEnemies, drawHUD)({ canvas: { ctx }, gameState });
};

const update = ({ ctx, gameState, deltaTime }) => {
  const secondsPassed = deltaTime / 1000;

  const spawnEnemy = (dTime) => {
    if (gameState.enemySpawnTimer(dTime)) {
      const newEnemy = gameState.queueEnemies.shift();
      if (newEnemy) {
        gameState.liveEnemies.push(newEnemy);
      }
    }
  };

  spawnEnemy(deltaTime);

  const newEnemies = gameState.liveEnemies.map((enemy) => {
    const newEnemy = {
      ...enemy,
      x: enemy.x - enemy.speed * secondsPassed,
    };

    return newEnemy;
  });
  return { ...gameState, liveEnemies: newEnemies };
};

let gameState = initialGameState;

export default {
  drawScreen: (ctx) => drawScreen(ctx, gameState),
  update: ({ deltaTime, ctx }) => {
    gameState = update({ ctx, deltaTime, gameState });
    return gameState;
  },
};
