import Bacon from 'baconjs';

export function bindInputs() {
  let keys = Bacon.fromEvent(document, 'keyup').map('.keyCode');

  return {
    left: keys.filter((x) => x === 37),
    right: keys.filter((x) => x === 39),
    restart: keys.filter((x) => x === 82),
    tick: Bacon.interval(100)
  };
}
