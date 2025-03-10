export default (context) => {
  const {
    canvas: { ctx },
  } = context;
  ctx.fillStyle = "#12263A";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
