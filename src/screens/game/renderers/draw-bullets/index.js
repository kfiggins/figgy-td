export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;
  const { towerBullets } = gameState;

  console.log("Drawing bullets", towerBullets);

  towerBullets.forEach((bullet) => {
    ctx.fillStyle = bullet.color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
    ctx.fill();
  });

  return context;
};
