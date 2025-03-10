export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;

  gameState.enemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
};
