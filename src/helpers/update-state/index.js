import { SCREENS } from "@enums";
import { game } from "@screens";

export default (state, deltaTime) => {
  switch (state.screen) {
    case SCREENS.GAME:
      return { ...state, ...game.update(deltaTime) };
    default:
      return state;
  }
};
