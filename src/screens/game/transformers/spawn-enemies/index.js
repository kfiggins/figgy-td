import { ENEMY_TYPES } from '@enums'

export default (context) => {
  const { enemySpawnTimer, queueEnemies, liveEnemies, deltaTime, board } = context;
  const { getCoordinates, startLocation } = board

  const shouldSpawn = enemySpawnTimer(deltaTime);

  if (shouldSpawn && queueEnemies.length > 0) {
    const [nextEnemyType, ...remainingQueue] = queueEnemies;
    const nextEnemy = enemyInfo[nextEnemyType.type]

    const {x, y} = getCoordinates(startLocation.row, startLocation.col)

    const newEnemy = {
      id: crypto.randomUUID(),
      ...nextEnemy,
      x: x - nextEnemy.width / 2,
      y: y - nextEnemy.height / 2,
      targetQueue: [],
      targetLocation: null
    }

    return { ...context, queueEnemies: remainingQueue, liveEnemies: [...liveEnemies, newEnemy] };
  }
  return context;
};


const enemyInfo = {
  [ENEMY_TYPES.BLOCK]: {
    color: "orange",
    width: 30,
    height: 30,
    speed: 60,
    health: 200,
  },
  [ENEMY_TYPES.DARTS]: {
    color: "yellow",
    shape: "triangle",
    width: 30,
    height: 30,
    speed: 70,
    health: 150,
  },
  [ENEMY_TYPES.MONOLITHS]: {
    color: "red",
    width: 50,
    height: 30,
    speed: 40,
    health: 500,
  },
  [ENEMY_TYPES.PIPS]: {
    color: "green",
    shape: "circle",
    width: 10,
    height: 10,
    speed: 100,
    health: 100,
  },
  [ENEMY_TYPES.ORBITERS]: {
    color: "cyan",
    shape: "circle",
    width: 30,
    height: 30,
    speed: 80,
    health: 300,
  },
  [ENEMY_TYPES.BULKS]: {
    color: "orange",
    shape: "hex",
    width: 20,
    height: 20,
    speed: 30,
    health: 2000,
  },
  [ENEMY_TYPES.FRACTALS]: {
    color: "red",
    shape: "triangle",
    width: 40,
    height: 40,
    speed: 50,
    health: 1000,
  },
  [ENEMY_TYPES.SINGULARITY]: {
    color: "black",
    shape: "circle",
    width: 50,
    height: 50,
    speed: 50,
    health: 5000,
  },
}