export default (context) => {
  const { board, liveEnemies, newTowerPlaced } = context;
  const { tiles, endLocation, getCoordinates, findPath } = board;
  const endCoordinates = getCoordinates(endLocation.row, endLocation.col)


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
      
      const path = findPath(tiles, enemy.x, enemy.y, endCoordinates.x, endCoordinates.y);

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
