import { getCanvas, handleClick } from "@helpers";

export default (stateManager) => {
  const canvas = getCanvas();

  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const currentState = stateManager.getState();
    const nextState = handleClick(currentState, x, y);

    stateManager.setState(nextState);
  });
};
