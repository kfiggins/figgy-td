export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;

  gameState.liveEnemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    if (enemy.shape === "circle") {
      ctx.beginPath();
      ctx.arc(enemy.x + enemy.width/2, enemy.y +  enemy.width/2, enemy.width/2, 0, 2 * Math.PI)
      ctx.fill();
    } else {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  });

  return context;
};
