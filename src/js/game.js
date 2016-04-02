import Bacon from 'baconjs';
import head from 'lodash/head';
import tail from 'lodash/tail';

import {Position, getRandomPosition, rotateLeft, rotateRight} from './position';
import {contains} from './utils';
import {logRestart, logControls} from './status';

export function getPosition(input) {
  let startDirection = new Position(0, 1);
  let startPosition = new Position(0, 0);
  let actions = input.left
    .map(() => rotateLeft)
    .merge(input.right.map(() => rotateRight));
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
  let pos = position();
  let appl = apple(pos);

  let length = appl.map(1).scan(10, (x, y) => x + y);
  let score = appl.map(1).scan(0, (x, y) => x + y);
  let snake = pos.slidingWindowBy(length);
  let dead = snake.filter((snake) => contains(tail(snake), head(snake)));

  let game = Bacon.combineTemplate({
    snake: snake,
    apple: appl,
    score: score
  });

  return game.takeUntil(dead);
}

export function repeated(game, restart) {
  let gm = function () {
    let tmp = game();

    tmp.onEnd(logRestart);
    return tmp;
  };

  restart.onValue(logControls);

  return Bacon.separateBy(restart, gm);
}
