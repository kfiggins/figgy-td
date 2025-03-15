export default (context) => {
  const { board, liveEnemies, towerBullets } = context;
  const newTowerBullets = [];

  const updatedTiles = board.tiles.map((row) => row.map((tile) => ({ ...tile })));

  for (let row = 0; row < updatedTiles.length; row++) {
    for (let col = 0; col < updatedTiles[row].length; col++) {
      const tile = updatedTiles[row][col];

      if (tile.type === "tower") {
        if (tile.bulletCooldown > 0) {
          tile.bulletCooldown--;
          continue;
        }

        const towerCoords = board.getCoordinates(row, col);

        const enemiesInRange = liveEnemies.filter((enemy) => {
          const distance = Math.sqrt(Math.pow(enemy.x - towerCoords.x, 2) + Math.pow(enemy.y - towerCoords.y, 2));
          return distance < (tile.range || 100);
        });

        if (enemiesInRange.length > 0) {
          let closestEnemy = enemiesInRange[0];
          let shortestDistance = Infinity;

          enemiesInRange.forEach((enemy) => {
            const distance = Math.sqrt(Math.pow(enemy.x - towerCoords.x, 2) + Math.pow(enemy.y - towerCoords.y, 2));

            if (distance < shortestDistance) {
              shortestDistance = distance;
              closestEnemy = enemy;
            }
          });

          const bullet = {
            id: Date.now() + Math.random(),
            x: towerCoords.x,
            y: towerCoords.y,
            targetEnemyId: closestEnemy.id,
            damage: tile.bulletDamage,
            speed: tile.bulletSpeed || 5,
            color: tile.bulletColor || "red",
            radius: 5,
          };

          newTowerBullets.push(bullet);

          tile.bulletCooldown = tile.bulletCooldownMax || 30;
        }
      }
    }
  }

  return {
    ...context,
    board: {
      ...board,
      tiles: updatedTiles,
    },
    towerBullets: [...towerBullets, ...newTowerBullets],
  };
};
