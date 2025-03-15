export default (context) => {
  const { liveEnemies, towerBullets } = context;

  const { updatedBullets, updatedEnemies } = towerBullets.reduce(
    (acc, bullet) => {
      const targetEnemy = liveEnemies.find((enemy) => enemy.id === bullet.targetEnemyId);

      if (!targetEnemy) {
        return {
          ...acc,
          updatedBullets: [...acc.updatedBullets, bullet],
        };
      }

      const distance = Math.sqrt(Math.pow(targetEnemy.x - bullet.x, 2) + Math.pow(targetEnemy.y - bullet.y, 2));

      if (distance < bullet.speed) {
        const enemyUpdated = acc.updatedEnemies.map((enemy) =>
          enemy.id === targetEnemy.id ? { ...enemy, health: enemy.health - bullet.damage } : enemy
        );
        return {
          updatedEnemies: enemyUpdated,
          updatedBullets: acc.updatedBullets,
        };
      } else {
        const updatedBullet = {
          ...bullet,
          x: bullet.x + ((targetEnemy.x - bullet.x) / distance) * bullet.speed,
          y: bullet.y + ((targetEnemy.y - bullet.y) / distance) * bullet.speed,
        };

        return {
          ...acc,
          updatedBullets: [...acc.updatedBullets, updatedBullet],
        };
      }
    },
    { updatedBullets: [], updatedEnemies: liveEnemies }
  );

  return {
    ...context,
    liveEnemies: updatedEnemies,
    towerBullets: updatedBullets,
  };
};
