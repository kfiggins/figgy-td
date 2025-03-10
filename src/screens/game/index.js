import { drawBackground, drawEnemies, drawHUD } from "./renderers";

// Could make the interval a function to speed up timer depending on game level
const makeTimer = (interval) => {
  let elapsed = 0;

  return (deltaTime) => {
    elapsed += deltaTime;
    
    if (elapsed >= interval) {
      elapsed -= interval;
      return true;
    }
    
    return false;
  };
}

const initialGameState = {
  enemySpawnTimer: makeTimer(1000),
  liveEnemies: [
  ],
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
};

const pipe =
  (...fns) =>
  (ctx) =>
    fns.forEach((fn) => fn(ctx));

const drawScreen = (ctx, gameState) => {
  pipe(drawBackground, drawHUD, drawEnemies)({ canvas: { ctx }, gameState });
};

const update = ({ ctx, gameState, deltaTime }) => {
  const secondsPassed = deltaTime / 1000;

  const spawnEnemy = (dTime) => {
    if (gameState.enemySpawnTimer(dTime)) {
      const newEnemy = gameState.queueEnemies.shift()
      if (newEnemy) {
        gameState.liveEnemies.push(newEnemy)
      }
    }
  }

  spawnEnemy(deltaTime)

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
