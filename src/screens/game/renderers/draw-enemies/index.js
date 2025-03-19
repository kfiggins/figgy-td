export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;

  gameState.liveEnemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    const fillPercent = enemy.startingHealth / enemy.health
    if (enemy.shape === "circle") {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(enemy.x + enemy.width/2, enemy.y +  enemy.width/2, enemy.width/2, 0, 2 * Math.PI)
      ctx.stroke();
      ctx.fillStyle = enemy.color;
      ctx.beginPath();
      ctx.arc(enemy.x + enemy.width/2, enemy.y +  enemy.width/2, enemy.width/2, 0, 2 * Math.PI / fillPercent)
      ctx.fill();
    } else if (enemy.shape === "triangle") {
      const x = enemy.x + enemy.width / 2
      const y = enemy.y + enemy.height / 2
      ctx.beginPath();
      ctx.moveTo(x, y - enemy.height / 2 / fillPercent); // Top vertex
      ctx.lineTo(x - enemy.width / 2, y + enemy.height / 2 / fillPercent); // Bottom left
      ctx.lineTo(x + enemy.height / 2, y + enemy.width / 2 / fillPercent); // Bottom right
      ctx.closePath();
      ctx.fill(); 
    } else if (enemy.shape === "hex") {
      const x = enemy.x + enemy.width / 2
      const y = enemy.y + enemy.height / 2
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        let angle = (Math.PI / 3) * i; // 60-degree increments
        let xOffset = x + enemy.width * Math.cos(angle);
        let yOffset = y + enemy.height * Math.sin(angle) / fillPercent;
        if (i === 0) {
            ctx.moveTo(xOffset, yOffset);
        } else {
            ctx.lineTo(xOffset, yOffset);
        }
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
      ctx.stroke();
      ctx.fillStyle = enemy.color;
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height / fillPercent);
    }
  });

  return context;
};
