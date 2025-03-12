export default (context) => {
  const { enemySpawnTimer, queueEnemies, liveEnemies, deltaTime } = context;

  const shouldSpawn = enemySpawnTimer(deltaTime);

  if (shouldSpawn && queueEnemies.length > 0) {
    const [newEnemy, ...remainingQueue] = queueEnemies;

    return { ...context, queueEnemies: remainingQueue, liveEnemies: [...liveEnemies, newEnemy] };
  }
  return context;
};
