import { GAME_STATES } from "@enums";
import { game, menu } from "@screens";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


let currentState = GAME_STATES.MENU;


canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  switch (currentState) {
    case GAME_STATES.MENU:
      const newState = menu.handleClick(x, y);
      if (newState) {
        currentState = newState;
      }
      break;
    case GAME_STATES.GAME:
      break;
    case GAME_STATES.GAME_OVER:
      break;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (currentState) {
    case GAME_STATES.MENU:
      menu.drawScreen(ctx);
      break;
    case GAME_STATES.GAME:
      game.drawScreen(ctx);
      break;
    case GAME_STATES.GAME_OVER:
      // gameOver.drawScreen(ctx);
      break;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
