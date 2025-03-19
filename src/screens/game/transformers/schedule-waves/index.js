import { ENEMY_TYPES } from '@enums'

const test = [
  {
    type: ENEMY_TYPES.BLOCK
  },
  {
    type: ENEMY_TYPES.DARTS
  },
  {
    type: ENEMY_TYPES.MONOLITHS
  },
  {
    type: ENEMY_TYPES.PIPS
  },
  {
    type: ENEMY_TYPES.ORBITERS
  },
  {
    type: ENEMY_TYPES.BULKS
  },
  {
    type: ENEMY_TYPES.FRACTALS
  },
  {
    type: ENEMY_TYPES.SINGULARITY
  },
]


const buildEnemies = (types, amount) => {
  const enemies = []
  for (let i = 0; i < amount; i++) {
    enemies.push(...types)
  }
  return enemies
}

const getNextWave = (level, firstWave) => {
  const enemyArray = [
    ENEMY_TYPES.BLOCK,
    ENEMY_TYPES.DARTS,
    ENEMY_TYPES.MONOLITHS,
    ENEMY_TYPES.PIPS,
    ENEMY_TYPES.ORBITERS,
    ENEMY_TYPES.BULKS,
    ENEMY_TYPES.FRACTALS,
    ENEMY_TYPES.SINGULARITY,
  ]

  const enemies = buildEnemies([{ type: enemyArray[level % enemyArray.length] }], 10)

  return {
    enemies,
    time: firstWave ? 3: enemies.length + 3,
  }
}

export default (context) => {
  const { queueEnemies, upcomingWave, deltaTime, waveTimer, lastWave, level, gameStarted } = context;

  if (!gameStarted) {
    return context;
  }

  if (waveTimer(deltaTime) && upcomingWave.time >= 0) {
    upcomingWave.time -= 1;
  }

  if (upcomingWave.time < 0 && !lastWave) {
    upcomingWave.time = 0;

    return {
      ...context,
      level: upcomingWave.defaultWave ? 1: level + 1,
      currentWave: upcomingWave,
      upcomingWave: getNextWave(level, upcomingWave.defaultWave),
      queueEnemies: upcomingWave.defaultWave ? [] : [...queueEnemies, ...upcomingWave.enemies],
    };
  }
  return context;
};