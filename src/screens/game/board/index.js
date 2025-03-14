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

   // Calculate grid position from x,y coordinates
   const getGridPosition = (x, y) => {
    const col = Math.floor((x - boardPadding) / size);
    const row = Math.floor((y - boardPadding) / size);
    return { row, col };
   };
  
  // Calculate center x,y coordinates from grid position
  const getCoordinates = (row, col) => {
    const x = boardPadding + col * size + size / 2;
    const y = boardPadding + row * size + size / 2;
    return { x, y };
  };

  const isOffBoard = (x, y) => {
    return x < boardPadding
      || y < boardPadding
      || x > size * tiles[0].length + boardPadding
      || y > size * tiles.length + boardPadding;
  }

  return {
    tiles,
    size,
    startLocation,
    endLocation,
    boardPadding,
    getGridPosition,
    getCoordinates,
    isOffBoard,
  };
};
