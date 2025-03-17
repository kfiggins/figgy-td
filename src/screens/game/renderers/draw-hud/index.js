export default (context) => {
  const {
    canvas: { ctx },
    gameState: { player },
  } = context;
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(`Gold: ${player.gold}`, 200, 50);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(`Health: ${player.health}`, 600, 50);

  return context;
};
