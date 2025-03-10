const initialGameState = {
  enemy: {
    x: 800,
    y: 150,
    width: 30,
    height: 30,
    speed: 100, // pixels per second
  },
};

const drawScreen = (ctx, gameState) => {
  ctx.fillStyle = "#12263A";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("THIS IS THE GAME", 200, 150);

  // Draw enemy
  ctx.fillStyle = "red";
  ctx.fillRect(gameState.enemy.x, gameState.enemy.y, gameState.enemy.width, gameState.enemy.height);
};

const update = ({ ctx, gameState, deltaTime }) => {
  const secondsPassed = deltaTime / 1000;
  const enemyDistanceMoved = gameState.enemy.speed * secondsPassed;

  const newEnemy = {
    ...gameState.enemy,
    x: gameState.enemy.x - enemyDistanceMoved,
  };

  // If enemy moves off screen, reset position to right side
  const resetEnemy = newEnemy.x < -newEnemy.width ? { ...newEnemy, x: ctx.canvas.width } : newEnemy;

  return {
    ...gameState,
    enemy: resetEnemy,
  };
};

let gameState = initialGameState;

export default {
  drawScreen: (ctx) => drawScreen(ctx, gameState),
  update: ({ deltaTime, ctx }) => {
    gameState = update({ ctx, deltaTime, gameState });
    return gameState;
  },
  getState: () => gameState,
  resetState: () => {
    gameState = initialGameState;
    return gameState;
  },
};
