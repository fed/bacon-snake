import Bacon from 'baconjs';

import {size} from './position';
import {drawGame, drawApple, drawSnake, setScore} from './rendering';
import {slidingWindowBy, separateBy} from './utils';
import {bindInputs, getPosition, game, repeated} from './game';

Bacon.Observable.prototype.slidingWindowBy = slidingWindowBy;
Bacon.separateBy = separateBy;

drawGame(size);

var inputs = bindInputs();
var position = getPosition.bind(null, inputs);
var newGame = game.bind(null, position);

repeated(newGame, inputs.restart).onValue(function (e) {
  drawSnake(e.snake);
  drawApple([e.apple]);
  setScore(e.score);
});
