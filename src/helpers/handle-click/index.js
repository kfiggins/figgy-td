import { SCREENS } from "@enums";
import { end, game, menu } from "@screens";

export default (state, x, y) => {
  switch (state.screen) {
    case SCREENS.MENU:
      const newScreen = menu.handleClick(x, y);
      return newScreen ? { ...state, screen: newScreen } : state;
    case SCREENS.GAME:
      game.handleClick(x, y);
      return state;
    case SCREENS.GAME_OVER:
      const newScreenEnd = end.handleClick(x, y);
      return newScreenEnd ? { ...state, screen: newScreenEnd } : state;
    default:
      return state;
  }
};
