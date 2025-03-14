import { SCREENS } from "@enums";
import { game, menu } from "@screens";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let mainState = {
  screen: SCREENS.MENU,
  lastTime: 0,
};

const handleClick = (state, x, y) => {
  switch (state.screen) {
    case SCREENS.MENU:
      const newScreen = menu.handleClick(x, y);
      mainState = newScreen ? { ...state, screen: newScreen } : state;
      break;
    case SCREENS.GAME:
      game.handleClick(x, y);
      break;
    case SCREENS.GAME_OVER:
      break;
    default:
      break;
  }
};

const updateState = (state, deltaTime) => {
  switch (state.screen) {
    case SCREENS.GAME:
      return { ...state, ...game.update(deltaTime) };
    default:
      return state;
  }
};

const renderGame = (state) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (state.screen) {
    case SCREENS.MENU:
      menu.drawScreen(ctx);
      break;
    case SCREENS.GAME:
      game.drawScreen(ctx);
      break;
    case SCREENS.GAME_OVER:
      break;
  }
};

function gameLoop(timestamp) {
  const deltaTime = timestamp - mainState.lastTime;
  mainState = updateState({ ...mainState, lastTime: timestamp }, deltaTime);

  renderGame(mainState);
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  handleClick(mainState, x, y);
});

requestAnimationFrame(gameLoop);
