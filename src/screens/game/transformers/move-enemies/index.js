export default (context) => {
  const { deltaTime, liveEnemies } = context;
  const secondsPassed = deltaTime / 1000;

  const updatedEnemies = liveEnemies.map((enemy) => ({
    ...enemy,
    x: enemy.x - enemy.speed * secondsPassed,
  }));

  return { ...context, liveEnemies: updatedEnemies };
};
