export default (context) => {
  const { liveEnemies } = context;

  const visibleEnemies = liveEnemies.filter((enemy) => enemy.x + enemy.width > 0);

  return { ...context, liveEnemies: visibleEnemies };
};
