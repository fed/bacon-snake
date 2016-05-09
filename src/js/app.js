import bacon from 'baconjs';

import {SIZE_X, SIZE_Y} from './constants';
import {Position} from './position';
import {drawBoard, drawApple, drawSnake} from './rendering';
import {logScore} from './status';
import {slidingWindowBy, separateBy} from './utils';
import {getPosition, game, repeated} from './game';
import {bindInputs} from './controls';

bacon.Observable.prototype.slidingWindowBy = slidingWindowBy;
bacon.separateBy = separateBy;

const inputs = bindInputs();
const position = getPosition.bind(null, inputs);
const newGame = game.bind(null, position);
const size = new Position(SIZE_X, SIZE_Y);

drawBoard(size);

repeated(newGame, inputs.restart).onValue((e) => {
  drawSnake(e.snake);
  drawApple([e.apple]);
  logScore(e.score);
});
