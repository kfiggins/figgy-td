export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;

  gameState.liveEnemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    if (enemy.shape === "circle") {
      ctx.beginPath();
      ctx.arc(enemy.x + enemy.width/2, enemy.y +  enemy.width/2, enemy.width/2, 0, 2 * Math.PI)
      ctx.fill();
    } else if (enemy.shape === "triangle") {
      ctx.beginPath();
      const x = enemy.x + enemy.width / 2
      const y = enemy.y + enemy.height / 2
      ctx.moveTo(x, y - enemy.height / 2); // Top vertex
      ctx.lineTo(x - enemy.width / 2, y + enemy.height / 2); // Bottom left
      ctx.lineTo(x + enemy.height / 2, y + enemy.width / 2); // Bottom right
      ctx.closePath();
       ctx.fill(); 
    } else if (enemy.shape === "hex") {
      const x = enemy.x + enemy.width / 2
      const y = enemy.y + enemy.height / 2
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        let angle = (Math.PI / 3) * i; // 60-degree increments
        let xOffset = x + enemy.width * Math.cos(angle);
        let yOffset = y + enemy.height * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(xOffset, yOffset);
        } else {
            ctx.lineTo(xOffset, yOffset);
        }
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  });

  return context;
};
