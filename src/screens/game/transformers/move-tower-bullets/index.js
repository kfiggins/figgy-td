export default (context) => {
  const { liveEnemies, towerBullets } = context;
  const { updatedBullets, updatedEnemies } = towerBullets.reduce(
    (acc, bullet) => {
      const targetEnemy = liveEnemies.find((enemy) => enemy.id === bullet.targetEnemyId);

      if (!targetEnemy) {
        return {
          ...acc,
          updatedBullets: acc.updatedBullets,
        };
      }

      const enemyCenterX = targetEnemy.x + targetEnemy.width / 2;
      const enemyCenterY = targetEnemy.y + targetEnemy.height / 2;

      const distance = Math.sqrt(Math.pow(enemyCenterX - bullet.x, 2) + Math.pow(enemyCenterY - bullet.y, 2));

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
          x: bullet.x + ((enemyCenterX - bullet.x) / distance) * bullet.speed,
          y: bullet.y + ((enemyCenterY - bullet.y) / distance) * bullet.speed,
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
