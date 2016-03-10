import Bacon from 'baconjs';
import head from 'lodash/head';
import tail from 'lodash/tail';

import {Position, getRandomPosition, rotateLeft, rotateRight} from './position';
import {contains} from './utils';
import {logRestart, logControls} from './status';

export function getPosition(input) {
  let actions = input.left
    .map(() => rotateLeft)
    .merge(input.right.map(() => rotateRight));

  let startDirection = new Position(0,1);
  let startPosition = new Position(0,0);

  let direction = actions.scan(startDirection, (x, f) => f(x));

  return direction
    .sampledBy(input.tick)
    .scan(startPosition, (x,y) => x.add(y));
}

function apple(position) {
  let appleRandomPosition = getRandomPosition();

  return position
    .filter((p) => p.equals(appleRandomPosition))
    .take(1)
    .flatMapLatest(apple.bind(null, position))
    .toProperty(appleRandomPosition);
}

export function game(position) {
  var pos = position();
  var appl = apple(pos);

  var length = appl.map(1).scan(10, (x,y) => x + y);
  var score = appl.map(1).scan(0, (x,y) => x + y);
  var snake = pos.slidingWindowBy(length);
  var dead = snake.filter((snake) => contains(tail(snake), head(snake)));

  var game = Bacon.combineTemplate({
    snake: snake,
    apple: appl,
    score: score
  });

  return game.takeUntil(dead);
}

export function repeated(game, restart) {
  let gm = function () {
    var tmp = game();

    tmp.onEnd(logRestart);
    return tmp;
  };

  restart.onValue(logControls);
  return Bacon.separateBy(restart, gm);
}
