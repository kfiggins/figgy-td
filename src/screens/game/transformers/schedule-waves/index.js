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

const wave1 = [
  {
    type: ENEMY_TYPES.BLOCK
  },
  {
    type: ENEMY_TYPES.BLOCK
  },
  {
    type: ENEMY_TYPES.BLOCK
  },
  {
    type: ENEMY_TYPES.BLOCK
  },
  {
    type: ENEMY_TYPES.DARTS
  },
  {
    type: ENEMY_TYPES.DARTS
  },
  {
    type: ENEMY_TYPES.DARTS
  },
  {
    type: ENEMY_TYPES.DARTS
  },
]

const wave2 = [
  {
    type: ENEMY_TYPES.MONOLITHS
  },
  {
    type: ENEMY_TYPES.MONOLITHS
  },
  {
    type: ENEMY_TYPES.MONOLITHS
  },
  {
    type: ENEMY_TYPES.MONOLITHS
  },
  {
    type: ENEMY_TYPES.PIPS
  },
  {
    type: ENEMY_TYPES.PIPS
  },
  {
    type: ENEMY_TYPES.PIPS
  },
  {
    type: ENEMY_TYPES.PIPS
  },
]

const wave3 = [
  {
    type: ENEMY_TYPES.ORBITERS
  },
  {
    type: ENEMY_TYPES.ORBITERS
  },
  {
    type: ENEMY_TYPES.ORBITERS
  },
  {
    type: ENEMY_TYPES.ORBITERS
  },
  {
    type: ENEMY_TYPES.BULKS
  },
  {
    type: ENEMY_TYPES.BULKS
  },
  {
    type: ENEMY_TYPES.BULKS
  },
  {
    type: ENEMY_TYPES.BULKS
  },
]

const wave4 = [
  {
    type: ENEMY_TYPES.FRACTALS
  },
  {
    type: ENEMY_TYPES.FRACTALS
  },
  {
    type: ENEMY_TYPES.FRACTALS
  },
  {
    type: ENEMY_TYPES.FRACTALS
  },
  {
    type: ENEMY_TYPES.SINGULARITY
  },
  {
    type: ENEMY_TYPES.SINGULARITY
  },
  {
    type: ENEMY_TYPES.SINGULARITY
  },
  {
    type: ENEMY_TYPES.SINGULARITY
  },
]

const waves = [
  {
    enemies: wave1,
    time: 5,
  },
  {
    enemies: wave2,
    time: 15,
  },
  {
    enemies: wave3,
    time: 15,
  },
  {
    enemies: wave4,
    time: 15,
  },
  // {
  //   enemies: test,
  //   timer: makeTimer(1000),
  // },
]

export default (context) => {
  const { queueEnemies, upcomingWave, deltaTime, waveTimer, lastWave } = context;

  if (waveTimer(deltaTime)) {
    upcomingWave.time -= 1;
  }

  if (upcomingWave.time < 0) {
    upcomingWave.time = 0;
    const wave = waves.shift()
    if (wave) {
      return { ...context, upcomingWave: wave, queueEnemies: [...queueEnemies, ...upcomingWave.enemies] };
    } else if (!lastWave) {
      return { ...context, lastWave: true, queueEnemies: [...queueEnemies, ...upcomingWave.enemies] };
    }
  }
  return context;
};