import { drawBackground, drawEnemies, drawHUD } from "./renderers";

const initialGameState = {
  enemies: [
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
      speed: 1000,
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
  const newEnemies = gameState.enemies.map((enemy) => {
    const newEnemy = {
      ...enemy,
      x: enemy.x - enemy.speed * secondsPassed,
    };

    return newEnemy;
  });
  return { ...gameState, enemies: newEnemies };
};

let gameState = initialGameState;

export default {
  drawScreen: (ctx) => drawScreen(ctx, gameState),
  update: ({ deltaTime, ctx }) => {
    gameState = update({ ctx, deltaTime, gameState });
    return gameState;
  },
};
