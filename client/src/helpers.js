function throttle(func, limit = 5) {
  let throttling;
  return function () {
    const args = arguments;
    const context = this;
    if (!throttling) {
      func.apply(context, args);
      throttling = true;
      setTimeout(() => throttling = false, limit);
    }
  };
}

export default throttle;
