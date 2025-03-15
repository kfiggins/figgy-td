export default (ctx) => {
  const { x, y, state } = ctx;
  const { tiles, isOffBoard, getGridPosition } = state.board;

  if (isOffBoard(x, y)) return;

  const { row, col } = getGridPosition(x, y);

  const tile = tiles[row][col];
  if (tile.type !== "tile") {
    return;
  }
  tiles[row][col] = {
    type: "tower",
    row,
    col,
    bulletCooldown: 30,
    bulletSpeed: 10,
    bulletDamage: 10,
    bulletColor: "red",
    range: 300,
  };

  const newState = { ...state, newTowerPlaced: true, board: { ...state.board, tiles: tiles } };

  return { ...ctx, state: newState };
};
