import { SCREENS } from "@enums";
import { end, game, menu } from "@screens";

export default (canvas, state) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (state.screen) {
    case SCREENS.MENU:
      menu.drawScreen(ctx);
      break;
    case SCREENS.GAME:
      game.drawScreen(ctx);
      break;
    case SCREENS.GAME_OVER:
      end.drawScreen({ ctx, state });
      break;
  }
};
