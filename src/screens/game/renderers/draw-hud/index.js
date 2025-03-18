export default (context) => {
  const {
    canvas: { ctx },
    gameState: { player, upcomingWave},
  } = context;
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(`Gold: ${player.gold}`, 150, 50);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(`Health: ${player.health}`, 350, 50);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText(`Timer: ${upcomingWave.time}`, 550, 50);

  return context;
};
