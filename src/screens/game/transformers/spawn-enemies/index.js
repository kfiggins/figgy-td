export default (context) => {
  const { enemySpawnTimer, queueEnemies, liveEnemies, deltaTime, board } = context;
  const { getCoordinates, startLocation } = board

  const shouldSpawn = enemySpawnTimer(deltaTime);

  if (shouldSpawn && queueEnemies.length > 0) {
    const [nextEnemy, ...remainingQueue] = queueEnemies;

    const {x, y} = getCoordinates(startLocation.row, startLocation.col)

    const newEnemy = {
      ...nextEnemy,
      x: x - nextEnemy.width / 2,
      y: y - nextEnemy.height / 2,
      targetQueue: [],
      targetLocation: null
    }

    return { ...context, queueEnemies: remainingQueue, liveEnemies: [...liveEnemies, newEnemy] };
  }
  return context;
};
