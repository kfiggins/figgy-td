export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;
  
  const size = 100
  const startX = 100
  const startY = 100
  ctx.beginPath();
  gameState.tiles.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      ctx.fillStyle = tile.backgroundColor;
      const x = colIndex * size + startX;
      const y = rowIndex * size + startY;
      ctx.fillRect(x, y, size, size);
      ctx.rect(x, y, size, size);
    })
  });

  ctx.strokeStyle = "black";
  ctx.stroke();
};
