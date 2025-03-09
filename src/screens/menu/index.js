const drawScreen = (ctx) => {
  ctx.fillStyle = "#12263A";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("🕹️ Figgy TD", 200, 150);

  ctx.font = "20px Arial";
  ctx.fillText("Click to Start", 300, 300);
};

export default { drawScreen };
