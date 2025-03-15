import { SCREENS } from "@enums";
import { handleClick, renderGame, updateState } from "./helpers";

const canvas = document.getElementById("gameCanvas");

let mainState = {
  screen: SCREENS.MENU,
  lastTime: 0,
};

const gameLoop = (timestamp) => {
  const deltaTime = timestamp - mainState.lastTime;
  mainState = updateState({ ...mainState, lastTime: timestamp }, deltaTime);

  renderGame(canvas, mainState);
  requestAnimationFrame(gameLoop);
};

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  mainState = handleClick(mainState, x, y);
});

requestAnimationFrame(gameLoop);
