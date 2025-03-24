const numberFormatter = new Intl.NumberFormat("en-US");

const formatNumber = (val) => numberFormatter.format(val);

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

  // Level
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`Level: ${state.level}`, 200, 250);

  // Gold earned
  const goldEarned = formatNumber(state.player.goldEarned);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`Gold earned: ${goldEarned}`, 200, 300);

  // Gold spent
  const goldSpent = formatNumber(state.player.goldSpent);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText(`Gold spent: ${goldSpent}`, 200, 350);
};

export default { drawScreen };
