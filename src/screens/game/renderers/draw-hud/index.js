export default (context) => {
  const {
    canvas: { ctx },
  } = context;
  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("THIS IS THE GAME", 200, 150);
};
