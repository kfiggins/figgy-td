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

  // Check if position is within grid bounds
  const isInBounds = (row, col) => {
    return row >= 0 && row < tiles.length && col >= 0 && col < tiles[0].length;
  };

  const isOffBoard = (x, y) => {
    return x < boardPadding
      || y < boardPadding
      || x > size * tiles[0].length + boardPadding
      || y > size * tiles.length + boardPadding;
  }

  // Check if tile is traversable
  const isTraversable = (tiles, row, col) => {
    return isInBounds(row, col) && tiles[row][col].type !== "tower";
  };

  // BFS to find shortest path
  const findPath = (tiles, startX, startY, endX, endY) => {
    const start = getGridPosition(startX, startY);
    const end = getGridPosition(endX, endY);

    // If already at the target, return empty path
    if (start.row === end.row && start.col === end.col) {
      return [];
    }

    const queue = [{ row: start.row, col: start.col, path: [] }];
    const visited = new Set();

    // Directions: up, right, down, left
    const directions = [
      { row: -1, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
    ];

    while (queue.length > 0) {
      const current = queue.shift();
      const key = `${current.row},${current.col}`;

      // Skip if already visited
      if (visited.has(key)) continue;
      visited.add(key);

      // Check if reached the end
      if (current.row === end.row && current.col === end.col) {
        return current.path;
      }

      // Try all directions
      for (const dir of directions) {
        const newRow = current.row + dir.row;
        const newCol = current.col + dir.col;

        if (isTraversable(tiles, newRow, newCol)) {
          const coords = getCoordinates(newRow, newCol);
          const newPath = [...current.path, coords];
          queue.push({ row: newRow, col: newCol, path: newPath });
        }
      }
    }

    // No path found
    return [];
  };

  return {
    tiles,
    size,
    startLocation,
    endLocation,
    boardPadding,
    getGridPosition,
    getCoordinates,
    isOffBoard,
    findPath,
  };
};
