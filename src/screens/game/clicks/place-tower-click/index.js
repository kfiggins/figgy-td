export default (ctx) => {
  const { x, y, state } = ctx;
  const { tiles, isOffBoard, getGridPosition } = state.board;

  if (isOffBoard(x, y)) return;

  const { row, col } = getGridPosition(x, y)

  const tile = tiles[row][col];
  if (tile.type !== "tile") {
    return;
  }
  tiles[row][col] = { type: "tower" };

  const newState = { ...state, newTowerPlaced: true, board: { ...state.board, tiles: tiles } };

  return { ...ctx, state: newState };
};
