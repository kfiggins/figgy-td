import { GAME_STATES } from "@enums";
import { game, menu } from "@screens";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameState = {
  screen: GAME_STATES.MENU,
  lastTime: 0,
};

const handleClick = (state, x, y) => {
  switch (state.screen) {
    case GAME_STATES.MENU:
      const newScreen = menu.handleClick(x, y);
      return newScreen ? { ...state, screen: newScreen } : state;
    case GAME_STATES.GAME:
    case GAME_STATES.GAME_OVER:
      return state;
    default:
      return state;
  }
};

const updateState = (state, deltaTime) => {
  switch (state.screen) {
    case GAME_STATES.GAME:
      return { ...state, ...game.update({ deltaTime }) };
    default:
      return state;
  }
};

const renderGame = (state) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (state.screen) {
    case GAME_STATES.MENU:
      menu.drawScreen(ctx);
      break;
    case GAME_STATES.GAME:
      game.drawScreen(ctx);
      break;
    case GAME_STATES.GAME_OVER:
      break;
  }
};

function gameLoop(timestamp) {
  const deltaTime = timestamp - gameState.lastTime;

  gameState = updateState({ ...gameState, lastTime: timestamp }, deltaTime);

  renderGame(gameState);
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  game.handleClick(x, y);
});

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  gameState = handleClick(gameState, x, y);
});

requestAnimationFrame(gameLoop);
