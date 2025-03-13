export default (context) => {
  const { deltaTime, liveEnemies } = context;
  const secondsPassed = deltaTime / 1000;

  const updatedEnemies = [];

  liveEnemies.forEach((enemy) => {

    const directionX = enemy.targetLocation.x - enemy.x;
    const directionY =  enemy.targetLocation.y - enemy.y;

    const distanceToTarget = Math.sqrt(directionX * directionX + directionY * directionY);
    const moveDistance = enemy.speed * secondsPassed;

    if (distanceToTarget < 15) {
      enemy.targetLocation = enemy.targetQueue.shift()
      if (!enemy.targetLocation) {
        return;
      }
    }

    

    const moveX = (directionX / distanceToTarget) * moveDistance;
    const moveY = (directionY / distanceToTarget) * moveDistance;

    updatedEnemies.push({
      ...enemy,
      x: enemy.x + moveX,
      y: enemy.y + moveY
    });
  });

  return { ...context, liveEnemies: updatedEnemies };
};
