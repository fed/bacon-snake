import Bacon from 'baconjs';
import {Pos, randomPos, rotateLeft, rotateRight} from './position';
import {contains} from './utils';
import {logRestart, logClear} from './rendering';

let _ = Bacon._;

export function bindInputs() {
  var keys = $(document).asEventStream('keyup').map('.keyCode');
  var lefts = keys.filter(function (x) { return x === 37; });
  var rights = keys.filter(function (x) { return x === 39; });
  var restart = keys.filter(function (x) { return x === 82; });
  var tick = Bacon.interval(100);
  return {
    left: lefts,
    right: rights,
    tick: tick,
    restart: restart
  };
}

export function getPosition(input/*, tick*/) {
  var actions = input.left
    .map(function () { return rotateLeft; })
    .merge(input.right.map(function () { return rotateRight; }));

  var startDirection = new Pos(0,1);
  var startPosition = new Pos(0,0);

  var direction = actions.scan(startDirection, function (x, f) {
    return f(x);
  });

  return direction
    .sampledBy(input.tick)
    .scan(startPosition, function (x,y) { return x.add(y); });
}

export function apple(position) {
  var applePos = randomPos();
  return position
      .filter(function (p) { return p.equals(applePos); })
      .take(1)
      .flatMapLatest(apple.bind(null, position))
      .toProperty(applePos);
}

export function game(position) {
  var pos = position();
  var appl = apple(pos);

  var length = appl.map(1).scan(10, function (x,y) { return x + y; });
  var score = appl.map(1).scan(0,  function (x,y) { return x + y; });
  var snake = pos.slidingWindowBy(length);

  var dead = snake.filter(function (snake) {
    return contains(_.tail(snake), _.head(snake));
  });

  var game = Bacon.combineTemplate({
    snake: snake,
    apple: appl,
    score: score
  });

  return game.takeUntil(dead);
}

export let repeated = function (game, restart) {
  var gm = function () {
    var tmp = game();
    tmp.onEnd(logRestart);
    return tmp;
  };

  restart.onValue(logClear);
  return Bacon.separateBy(restart, gm);
};
