import { ENEMY_TYPES } from "@enums";

export default (context) => {
  const { enemySpawnTimer, queueEnemies, liveEnemies, deltaTime, board } = context;
  const { getCoordinates, startLocation } = board;

  const shouldSpawn = enemySpawnTimer(deltaTime);

  if (shouldSpawn && queueEnemies.length > 0) {
    const [nextEnemyType, ...remainingQueue] = queueEnemies;
    const nextEnemy = enemyInfo[nextEnemyType.type];

    const { x, y } = getCoordinates(startLocation.row, startLocation.col);

    const newEnemy = {
      id: crypto.randomUUID(),
      ...nextEnemy,
      x: x - nextEnemy.width / 2,
      y: y - nextEnemy.height / 2,
      targetQueue: [],
      targetLocation: null,
    };

    return { ...context, queueEnemies: remainingQueue, liveEnemies: [...liveEnemies, newEnemy] };
  }
  return context;
};

const enemyInfo = {
  [ENEMY_TYPES.BLOCK]: {
    color: "orange",
    health: 200,
    height: 30,
    reward: 5,
    speed: 60,
    width: 30,
  },
  [ENEMY_TYPES.DARTS]: {
    color: "yellow",
    health: 150,
    height: 30,
    reward: 5,
    shape: "triangle",
    speed: 70,
    width: 30,
  },
  [ENEMY_TYPES.MONOLITHS]: {
    color: "red",
    health: 500,
    height: 30,
    reward: 10,
    speed: 40,
    width: 50,
  },
  [ENEMY_TYPES.PIPS]: {
    color: "green",
    health: 100,
    height: 10,
    reward: 10,
    shape: "circle",
    speed: 100,
    width: 10,
  },
  [ENEMY_TYPES.ORBITERS]: {
    color: "cyan",
    health: 300,
    height: 30,
    shape: "circle",
    speed: 80,
    width: 30,
  },
  [ENEMY_TYPES.BULKS]: {
    color: "orange",
    health: 2000,
    height: 20,
    reward: 20,
    shape: "hex",
    speed: 30,
    width: 20,
  },
  [ENEMY_TYPES.FRACTALS]: {
    color: "red",
    health: 1000,
    height: 40,
    reward: 20,
    shape: "triangle",
    speed: 50,
    width: 40,
  },
  [ENEMY_TYPES.SINGULARITY]: {
    color: "black",
    health: 5000,
    height: 50,
    reward: 50,
    shape: "circle",
    speed: 50,
    width: 50,
  },
};
