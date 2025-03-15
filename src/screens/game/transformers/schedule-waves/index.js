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
  wave1,
  wave2,
  wave3,
  wave4,
  // test,
]

export default (context) => {
  const { queueEnemies } = context;
  // TODO: add timer for waves and combined into queueEnemies
  if (queueEnemies.length === 0 && waves.length !== 0) {
    return { ...context, queueEnemies: waves.shift() };
  }
  return context;
};