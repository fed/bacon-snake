import Bacon from 'baconjs';

import {SIZE_X, SIZE_Y} from './constants';
import {Position} from './position';
import {drawBoard, drawApple, drawSnake} from './rendering';
import {setScore} from './status';
import {slidingWindowBy, separateBy} from './utils';
import {getPosition, game, repeated} from './game';
import {bindInputs} from './controls';

Bacon.Observable.prototype.slidingWindowBy = slidingWindowBy;
Bacon.separateBy = separateBy;

const inputs = bindInputs();
const position = getPosition.bind(null, inputs);
const newGame = game.bind(null, position);
const size = new Position(SIZE_X, SIZE_Y);

drawBoard(size);

repeated(newGame, inputs.restart).onValue((e) => {
  drawSnake(e.snake);
  drawApple([e.apple]);
  setScore(e.score);
});
