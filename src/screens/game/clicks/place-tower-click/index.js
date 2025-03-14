export default (ctx) => {
  const { x, y, state } = ctx;
  const { tiles, size, boardPadding } = state.board;

  if (x < boardPadding || y < boardPadding) return;
  if (x > size * tiles[0].length + boardPadding || y > size * tiles.length + boardPadding) return;

  const col = Math.floor((x - boardPadding) / size);
  const row = Math.floor((y - boardPadding) / size);
  const tile = tiles[row][col];
  if (tile.type !== "tile") {
    return;
  }
  tiles[row][col] = { type: "tower" };

  const newState = { ...state, newTowerPlaced: true, board: { ...state.board, tiles: tiles } };

  return { ...ctx, state: newState };
};
