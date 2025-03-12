export default (context) => {
  const { deltaTime, liveEnemies, endLocation } = context;
  const secondsPassed = deltaTime / 1000;

  const updatedEnemies = [];

  liveEnemies.forEach((enemy) => {

    const directionX = endLocation.x - enemy.x;
    const directionY = endLocation.y - enemy.y;

    const distanceToTarget = Math.sqrt(directionX * directionX + directionY * directionY);

    if (distanceToTarget < 30) {
      return;
    }

    let moveDistance = enemy.speed * secondsPassed;

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
