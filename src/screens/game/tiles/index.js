export default () => {
  const size = 50;
  const numberOfRows = 12;
  const numberOfCols = 16;
  const startLocation = { row: 0, col: 0 };
  const endLocation = { row: 11, col: 15 };
  const boardPadding = 100;

  const tile = { type: "tile" };
  const startTile = { type: "start" };
  const endTile = { type: "end" };

  const tiles = Array.from({ length: numberOfRows }, () => Array.from({ length: numberOfCols }, () => tile));

  tiles[startLocation.row][startLocation.col] = startTile;
  tiles[endLocation.row][endLocation.col] = endTile;

  return {
    tiles,
    size,
    startLocation,
    endLocation,
    boardPadding,
  };
};
