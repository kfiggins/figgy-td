import { game, menu } from "./screens";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const STATES = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER",
};

let currentState = STATES.MENU;

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (currentState) {
    case STATES.MENU:
      menu.drawScreen(ctx);
      break;
    case STATES.GAME:
      game.drawScreen(ctx);
      break;
    case STATES.GAME_OVER:
      // gameOver.drawScreen(ctx);
      break;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
