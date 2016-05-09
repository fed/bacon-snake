import bacon from 'baconjs';

export function bindInputs() {
  let keys = bacon.fromEvent(document, 'keyup').map('.keyCode');

  return {
    left: keys.filter((x) => x === 37), // 37 = left arrow
    right: keys.filter((x) => x === 39), // 39 = right arrow
    restart: keys.filter((x) => x === 82), // 82 = r key
    tick: bacon.interval(100)
  };
}
