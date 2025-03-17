import { SCREENS } from "@enums";

const buttons = [
  {
    x: 150,
    y: 400,
    width: 200,
    height: 50,
    text: "Back to Menu",
    fn: () => SCREENS.MENU,
  },
];

const handleClick = (x, y) => {
  for (const button of buttons) {
    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      return button.fn();
    }
  }
  return null;
};

const drawScreen = (ctx) => {
  ctx.fillStyle = "#12263A";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "40px Arial";
  ctx.fillText("It's all over", 200, 150);

  buttons.forEach((button) => {
    ctx.fillStyle = "#555";
    ctx.fillRect(button.x, button.y, button.width, button.height);

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 7);
  });
};

export default { drawScreen, handleClick };
