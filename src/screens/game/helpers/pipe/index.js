export default (...fns) =>
  (ctx) =>
    fns.forEach((fn) => fn(ctx));
