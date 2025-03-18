export default (context) => {
  const {
    canvas: { ctx },
    gameState,
  } = context;

  const { tiles, size, boardPadding } = gameState.board;

  ctx.beginPath();
  tiles.forEach((row, rowIndex) => {
    row.forEach((tile, colIndex) => {
      const tileData = mapTileType[tile.type];

      ctx.fillStyle = tile.color || tileData.backgroundColor;
      const x = colIndex * size + boardPadding;
      const y = rowIndex * size + boardPadding;
      ctx.fillRect(x, y, size, size);
      ctx.rect(x, y, size, size);
    });
  });

  ctx.strokeStyle = "black";
  ctx.stroke();

  return context;
};

const tile = {
  type: "normal",
  backgroundColor: "blue",
  img: null,
  isOpen: true,
};

const startTile = {
  type: "start",
  backgroundColor: "pink",
  img: null,
  isOpen: true,
};

const endTile = {
  type: "end",
  backgroundColor: "gray",
  img: null,
  isOpen: true,
};

const towerTile = {
  type: "tower",
  backgroundColor: "orange",
  img: null,
  isOpen: true,
};

const mapTileType = {
  tile: tile,
  start: startTile,
  end: endTile,
  tower: towerTile,
};
