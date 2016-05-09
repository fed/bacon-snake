import bacon from 'baconjs';

export function isEqual(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function contains(haystack, needle) {
  return haystack.filter((element) => isEqual(element, needle)).length;
}

export function separateBy(sep, obs) {
  return obs().changes().concat(sep.take(1).flatMap(() => bacon.separateBy(sep, obs)));
}

export function slidingWindowBy(lengthObs) {
  let self = this;

  return new bacon.EventStream((sink) => {
    let buf = [];
    let length = 0;

    lengthObs.onValue((n) => {
      length = n;
    });

    self.onValue((x) => {
      buf.unshift(x);
      buf = buf.slice(0, length);
      sink(new bacon.Next(buf));
    });

    return () => {};
  });
}
