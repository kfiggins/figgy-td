import { menu } from "./screens";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  menu.drawScreen(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
