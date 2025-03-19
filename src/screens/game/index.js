import { placeTowerClick, upgradeTowerClick } from "./clicks";
import { makeTimer, pipe } from "./helpers";
import { drawBackground, drawTiles, drawEnemies, drawHUD, drawBullets } from "./renderers";
import getBoard from "./board";
import {
  calculateEnemyPath,
  moveEnemies,
  createTowerBullets,
  spawnEnemies,
  moveTowerBullets,
  scheduleWaves,
} from "./transformers";

const createInitialGameState = () => ({
  board: getBoard(),
  enemySpawnTimer: makeTimer(1000),
  waveTimer: makeTimer(1000),
  level: 0,
  gameStarted: true,
  lastWave: false,
  upcomingWave: { time: -1, defaultWave: true },
  enemiesKilled: 0,
  liveEnemies: [],
  newTowerPlaced: false,
  queueEnemies: [],
  towerBullets: [],
  player: {
    health: 20,
    gold: 100,
  },
});

const drawScreen = (context) => {
  pipe(drawBackground, drawTiles, drawBullets, drawEnemies, drawHUD)(context);
};

const update = (context) => {
  return pipe(
    scheduleWaves,
    spawnEnemies,
    calculateEnemyPath,
    moveEnemies,
    moveTowerBullets,
    createTowerBullets
  )(context);
};

const gameEngine = (() => {
  let currentState = createInitialGameState();

  return {
    getState: () => JSON.parse(JSON.stringify(currentState)),
    resetGame: () => {
      currentState = createInitialGameState();
      return gameEngine.getState();
    },
    drawScreen: (ctx) => drawScreen({ canvas: { ctx }, gameState: currentState }),
    update: (deltaTime) => {
      currentState = update({ ...currentState, deltaTime });
      return gameEngine.getState();
    },
    handleClick: (x, y) => {
      const output = pipe(placeTowerClick, upgradeTowerClick)({ x, y, state: currentState });
      if (output) {
        currentState = output.state;
      }
    },
  };
})();

export default gameEngine;
