export default function debounceSeries(func, interval, immediate) {
  let timer;
  return function (...args) {
    const context = this;
    const later = function () {
      timer = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, interval);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
