export default (initialState) => {
  let currentState = initialState;

  const setState = (newState) => {
    currentState = newState;
    return currentState;
  };

  const getState = () => currentState;

  return { setState, getState };
};
