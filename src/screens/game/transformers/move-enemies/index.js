export default (context) => {
  const { deltaTime, enemiesKilled, liveEnemies, player } = context;
  const secondsPassed = deltaTime / 1000;

  const updatedEnemies = [];
  const updatedPlayer = { ...player };
  let updatedEnemiesKilled = enemiesKilled;

  liveEnemies.forEach((enemy) => {
    const directionX = enemy.targetLocation.x - enemy.x - enemy.width / 2;
    const directionY = enemy.targetLocation.y - enemy.y - enemy.height / 2;

    const distanceToTarget = Math.sqrt(directionX * directionX + directionY * directionY);
    const moveDistance = enemy.speed * secondsPassed;

    if (distanceToTarget < 15) {
      enemy.targetLocation = enemy.targetQueue.shift();
      if (!enemy.targetLocation) {
        updatedPlayer.health -= 1;
        return;
      }
    }

    const moveX = (directionX / distanceToTarget) * moveDistance;
    const moveY = (directionY / distanceToTarget) * moveDistance;

    if (enemy.health <= 0) {
      updatedPlayer.gold += enemy.reward || 0;
      updatedPlayer.goldEarned += enemy.reward || 0;
      updatedEnemiesKilled += 1;
      return;
    }

    updatedEnemies.push({
      ...enemy,
      x: enemy.x + moveX,
      y: enemy.y + moveY,
    });
  });

  return { ...context, enemiesKilled: updatedEnemiesKilled, liveEnemies: updatedEnemies, player: updatedPlayer };
};
