import Bacon from 'baconjs';

export function contains(haystack, needle) {
  return haystack.filter((pos) => pos.equals(needle)).length;
}

export function separateBy(sep, obs) {
  return obs().changes().concat(sep.take(1).flatMap(() => Bacon.separateBy(sep, obs)));
}

export function slidingWindowBy(lengthObs) {
  let self = this;

  return new Bacon.EventStream((sink) => {
    let buf = [];
    let length = 0;

    lengthObs.onValue((n) => {
      length = n;
    });

    self.onValue((x) => {
      buf.unshift(x);
      buf = buf.slice(0, length);
      sink(new Bacon.Next(buf));
    });

    return () => {};
  });
}
