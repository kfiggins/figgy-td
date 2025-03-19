import { updateState } from "@helpers";
import { SCREENS } from "@enums";

export default (currentState, timestamp) => {
  const deltaTime = timestamp - currentState.lastTime;
  const updatedState = updateState({ ...currentState, lastTime: timestamp }, deltaTime);

  if (updatedState?.player?.health <= 0) {
    return {
      ...updatedState,
      screen: SCREENS.GAME_OVER,
      player: { ...updatedState.player, health: 20 },
    };
  }

  return updatedState;
};
