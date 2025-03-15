export default (context) => {
  const { board, liveEnemies, towerBullets } = context;
  const newTowerBullets = [];
  const towerTiles = [];

  for (let row = 0; row < board.tiles.length; row++) {
    for (let col = 0; col < board.tiles[row].length; col++) {
      if (board.tiles[row][col].type === "tower") {
        towerTiles.push({
          ...board.tiles[row][col],
          row,
          col,
        });
      }
    }
  }

  towerTiles.forEach((tower) => {
    if (tower.bulletCooldown > 0) {
      tower.bulletCooldown--;
      return;
    }

    const towerCoords = board.getCoordinates(tower.row, tower.col);

    const enemiesInRange = liveEnemies.filter((enemy) => {
      const distance = Math.sqrt(Math.pow(enemy.x - towerCoords.x, 2) + Math.pow(enemy.y - towerCoords.y, 2));
      return distance < (tower.range || 100);
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
        x: towerCoords.x,
        y: towerCoords.y,
        targetEnemyId: closestEnemy.id,
        damage: tower.bulletDamage,
        speed: tower.bulletSpeed || 5,
        color: tower.bulletColor || "red",
      };

      newTowerBullets.push(bullet);

      tower.bulletCooldown = tower.bulletCooldownMax || 1000;
    }
  });

  return {
    ...context,
    towerBullets: [...towerBullets, ...newTowerBullets],
  };
};
