export default (ctx) => {
  const { x, y, state } = ctx;
  const { tiles, isOffBoard, getGridPosition, getCoordinates, startLocation, endLocation, findPath } = state.board;

  if (isOffBoard(x, y)) return;

  const { row, col } = getGridPosition(x, y);

  const oldTile = tiles[row][col];
  if (!oldTile || oldTile.type !== "tile") {
    return;
  }
  tiles[row][col] = {
    type: "tower",
    row,
    col,
    bulletCooldown: 50,
    bulletCooldownMax: 50,
    bulletSpeed: 5,
    bulletDamage: 10,
    bulletColor: "red",
    range: 200,
  };

  const startCoordinates = getCoordinates(startLocation.row, startLocation.col)
  const endCoordinates = getCoordinates(endLocation.row, endLocation.col)
  const path = findPath(tiles, startCoordinates.x, startCoordinates.y, endCoordinates.x, endCoordinates.y)
  if (path.length === 0) {
    tiles[row][col] = oldTile;
    return;
  }

  const newState = { ...state, newTowerPlaced: true, board: { ...state.board, tiles: tiles } };

  return { ...ctx, state: newState };
};
