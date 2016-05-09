import bacon from 'baconjs';
import head from 'lodash/head';
import tail from 'lodash/tail';

import {Position, getRandomPosition, rotateLeft, rotateRight} from './position';
import {contains, isEqual} from './utils';
import {logRestart, logControls} from './status';

export function getPosition(input) {
  let startDirection = new Position(0, 1);
  let startPosition = new Position(0, 0);
  let direction = input.left
    .map(() => rotateLeft)
    .merge(input.right.map(() => rotateRight))
    .scan(startDirection, (x, f) => f(x));

  return direction
    .sampledBy(input.tick)
    .scan(startPosition, (x,y) => x.add(y));
}

function apple(position) {
  let appleRandomPosition = getRandomPosition();

  return position
    .filter((p) => isEqual(p, appleRandomPosition))
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
  let game = bacon.combineTemplate({
    snake: snake,
    apple: appl,
    score: score
  });

  return game.takeUntil(dead);
}

export function repeated(game, restart) {
  let gm = () => {
    let tmp = game();

    tmp.onEnd(logRestart);

    return tmp;
  };

  restart.onValue(logControls);

  return bacon.separateBy(restart, gm);
}
