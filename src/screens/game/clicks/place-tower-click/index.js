export default (ctx) => {
  const { x, y, state } = ctx;
  const { tiles, isOffBoard, getGridPosition, getCoordinates, startLocation, endLocation, findPath } = state.board;

  // TODO: Cost should come from tower type being placed when ready.
  const TOWER_COST = 10;
  if (state.player.gold < TOWER_COST) {
    return ctx;
  }

  if (isOffBoard(x, y)) return ctx;

  const { row, col } = getGridPosition(x, y);

  const oldTile = tiles[row][col];
  if (!oldTile || oldTile.type !== "tile") {
    return ctx;
  }
  tiles[row][col] = {
    bulletColor: "red",
    bulletCooldown: 50,
    bulletCooldownMax: 50,
    bulletDamage: 10,
    bulletSpeed: 5,
    col,
    color: "orange",
    level: 1,
    range: 200,
    row,
    type: "tower",
  };

  const startCoordinates = getCoordinates(startLocation.row, startLocation.col);
  const endCoordinates = getCoordinates(endLocation.row, endLocation.col);
  const path = findPath(tiles, startCoordinates.x, startCoordinates.y, endCoordinates.x, endCoordinates.y);
  if (path.length === 0) {
    tiles[row][col] = oldTile;
    return ctx;
  }

  const newState = {
    ...state,
    newTowerPlaced: true,
    board: { ...state.board, tiles: tiles },
    player: { ...state.player, gold: state.player.gold - TOWER_COST },
  };

  return { ...ctx, state: newState };
};
