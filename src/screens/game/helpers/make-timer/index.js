export default (interval) => {
  let elapsed = 0;

  return (deltaTime) => {
    elapsed += deltaTime;

    if (elapsed >= interval) {
      elapsed -= interval;
      return true;
    }

    return false;
  };
};
