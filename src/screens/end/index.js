const drawScreen = ({ ctx, state }) => {
  ctx.fillStyle = "#12263A";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("It's all over", 200, 150);

  // Enemies killed
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`Enemies killed: ${state.enemiesKilled}`, 200, 200);
};

export default { drawScreen };
