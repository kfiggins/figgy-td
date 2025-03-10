import { GAME_STATES } from "@enums";
import { game, menu } from "@screens";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let currentState = {
  currentState: GAME_STATES.MENU,
  lastTime: 0,
};

const handleClick = (state, x, y) => {
  switch (state.currentState) {
    case GAME_STATES.MENU:
      return {
        ...state,
        currentState: menu.handleClick(x, y) || state.currentState,
      };
    case GAME_STATES.GAME:
    case GAME_STATES.GAME_OVER:
      return state;
    default:
      return state;
  }
};

const updateState = (state) => {
  switch (state.currentState) {
    case GAME_STATES.MENU:
      return { ...state };
    case GAME_STATES.GAME:
      return { ...state };
    case GAME_STATES.GAME_OVER:
      return { ...state };
    default:
      return state;
  }
};

const renderGame = (state) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (state.currentState) {
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
  const deltaTime = timestamp - currentState.lastTime;

  currentState = updateState({ ...currentState, lastTime: timestamp }, deltaTime);

  if (currentState.currentState === GAME_STATES.GAME) {
    game.update({ ctx, deltaTime });
  }

  renderGame(currentState);

  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  currentState = handleClick(currentState, x, y);
});

requestAnimationFrame(gameLoop);
