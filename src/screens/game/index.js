import { drawBackground, drawEnemies, drawHUD, drawTiles } from "./renderers";
import getTiles  from "./tiles";

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
  spawnLocation: { x: 135, y: 135 },
  endLocation: { x: 835, y: 635 },
  liveEnemies: [
  ],
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
  tiles: getTiles()
};

const pipe =
  (...fns) =>
  (ctx) =>
    fns.forEach((fn) => fn(ctx));

const drawScreen = (ctx, gameState) => {
  pipe(drawBackground, drawTiles, drawEnemies, drawHUD)({ canvas: { ctx }, gameState });
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

  const newEnemies = []

  gameState.liveEnemies.forEach((enemy) => {

    const directionX = gameState.endLocation.x - enemy.x;
    const directionY = gameState.endLocation.y - enemy.y;

    const distanceToTarget = Math.sqrt(directionX * directionX + directionY * directionY);

    if (distanceToTarget < 30) {
      return;
    }

    let moveDistance = enemy.speed * secondsPassed;

    const moveX = (directionX / distanceToTarget) * moveDistance;
    const moveY = (directionY / distanceToTarget) * moveDistance;

    newEnemies.push({
      ...enemy,
      x: enemy.x + moveX,
      y: enemy.y + moveY
    });
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
