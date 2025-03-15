export default (context) => {
  const { board, liveEnemies, newTowerPlaced } = context;
  const { tiles, endLocation, getGridPosition, getCoordinates } = board;
  const endCoordinates = getCoordinates(endLocation.row, endLocation.col)

  // Check if position is within grid bounds
  const isInBounds = (row, col) => {
    return row >= 0 && row < tiles.length && col >= 0 && col < tiles[0].length;
  };

  // Check if tile is traversable
  const isTraversable = (row, col) => {
    return isInBounds(row, col) && tiles[row][col].type !== "tower";
  };

  // BFS to find shortest path
  const findPath = (startX, startY, endX, endY) => {
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

        if (isTraversable(newRow, newCol)) {
          const coords = getCoordinates(newRow, newCol);
          const newPath = [...current.path, coords];
          queue.push({ row: newRow, col: newCol, path: newPath });
        }
      }
    }

    // No path found
    return [];
  };

  const updatedEnemies = liveEnemies.map((enemy) => {
    // Calculate new path if:
    // 1. Enemy has no target queue, or
    // 2. Enemy has reached its current target or is very close to it, or
    // 3. A new tower has been placed
    const needsNewPath =
      (enemy.targetQueue.length === 0 && !enemy.targetLocation) ||
      newTowerPlaced === true;

    if (needsNewPath) {
      // Find path from current position to end location
      
      const path = findPath(enemy.x, enemy.y, endCoordinates.x, endCoordinates.y);

      // Update target queue and current target if path found
      if (path.length > 0) {
        return {
          ...enemy,
          targetQueue: path.slice(1), // Skip the first waypoint as it's close to current position
          targetLocation: path[0],
        };
      }
    }

    // If enemy has a target queue but has reached its current target
    if (
      enemy.targetQueue.length > 0 &&
      Math.abs(enemy.x - enemy.targetLocation.x) < 5 &&
      Math.abs(enemy.y - enemy.targetLocation.y) < 5
    ) {
      // Move to next target in queue
      const newTargetQueue = [...enemy.targetQueue];
      const nextTarget = newTargetQueue.shift();

      return {
        ...enemy,
        targetQueue: newTargetQueue,
        targetLocation: nextTarget || endCoordinates,
      };
    }

    return enemy;
  });

  // Reset the newTowerPlaced flag after processing
  return { ...context, liveEnemies: updatedEnemies, newTowerPlaced: false };
};
