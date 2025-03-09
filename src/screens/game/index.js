const drawScreen = (ctx) => {
  ctx.fillStyle = "#12263A";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("THIS IS THE GAME", 200, 150);
};

export default { drawScreen };
