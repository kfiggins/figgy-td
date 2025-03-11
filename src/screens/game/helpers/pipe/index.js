export default (...fns) =>
  (initialValue) =>
    fns.reduce((value, fn) => fn(value), initialValue);
