const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScene();

  requestAnimationFrame(gameLoop);
}

function drawScene() {
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 50, 50);
}

gameLoop();
