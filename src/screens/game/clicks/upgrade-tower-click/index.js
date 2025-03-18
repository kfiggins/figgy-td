export default (ctx) => {
  const { x, y, state } = ctx;
  const { tiles, isOffBoard, getGridPosition } = state.board;

  if (ctx.state.newTowerPlaced) {
    return ctx;
  }

  const newTiles = [...tiles];
  if (isOffBoard(x, y)) return ctx;

  const { row, col } = getGridPosition(x, y);

  const oldTile = newTiles[row][col];
  if (!oldTile || oldTile.type !== "tower") {
    return ctx;
  }

  const currentTower = newTiles[row][col];
  const currentLevel = currentTower.level;
  const nextLevel = currentLevel + 1;
  const nextLevelStats = basicTowerLevels[nextLevel];

  if (!nextLevelStats) {
    return ctx;
  }

  const cost = nextLevelStats.cost;
  if (state.player.gold < cost) {
    return ctx;
  }

  newTiles[row][col] = {
    ...currentTower,
    ...nextLevelStats,
    level: nextLevel,
  };

  const newState = {
    ...state,
    board: { ...state.board, tiles: newTiles },
    player: { ...state.player, gold: state.player.gold - cost },
  };

  return { ...ctx, state: newState };
};

const basicTowerLevels = {
  1: {
    bulletCooldown: 50,
    bulletDamage: 10,
    bulletSpeed: 5,
    color: "orange",
    cost: 10,
    range: 200,
  },
  2: {
    bulletCooldown: 40,
    bulletDamage: 20,
    bulletSpeed: 6,
    color: "red",
    cost: 20,
    range: 225,
  },
  3: {
    bulletCooldown: 30,
    bulletDamage: 50,
    bulletSpeed: 7,
    color: "green",
    cost: 30,
    range: 250,
  },
  4: {
    bulletCooldown: 20,
    bulletDamage: 100,
    bulletSpeed: 8,
    color: "purple",
    cost: 40,
    range: 275,
  },
  5: {
    bulletCooldown: 10,
    bulletDamage: 200,
    bulletSpeed: 9,
    color: "black",
    cost: 50,
    range: 300,
  },
};
