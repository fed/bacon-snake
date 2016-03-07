'use strict';

//////////////
// Position //
//////////////

const SIZE_X = 20;
const SIZE_Y = 20;

function Pos(x, y) {
  this.x = x;
  this.y = y;

  this.equals = function (p) {
    return this.x === p.x && this.y === p.y;
  };

  this.add = function (p) {
    return new Pos(
      (this.x + p.x + SIZE_X) % SIZE_X,
      (this.y + p.y + SIZE_Y) % SIZE_Y
    );
  };
}

const size = new Pos(SIZE_X, SIZE_Y);

function randomPos() {
  return new Pos(
    Math.floor(Math.random() * SIZE_X),
    Math.floor(Math.random() * SIZE_Y)
  );
}

function rotateRight(pos) {
  return new Pos(-pos.y, pos.x);
}

function rotateLeft(pos) {
  return new Pos(pos.y, -pos.x);
}

///////////////
// Rendering //
///////////////

function drawGame(size) {
  var game = $('#game');

  for (var i = 0; i < size.x; i++) {
    var row = $('<div class="row" />');

    for (var j = 0; j < size.y; j++) {
      row.append('<span class="cell" />');
    }

    game.append(row);
  }
}

function fillCells(klass) {
  var game = $('#game');

  return function (ps) {
    game.find('.cell').removeClass(klass);

    for (var i in ps) {
      game.find('.row:eq('+ps[i].y+')')
        .find('.cell:eq('+ps[i].x+')')
        .addClass(klass);
    }
  };
}

var drawApple = fillCells('apple');
var drawSnake = fillCells('snake');

function logRestart() {
  $('#log').html('Press "r" to restart');
}

function logClear() {
  $('#log').html('Press left/right to steer.');
}

let $score = $('#score');

function setScore(score) {
  $score.html(score);
}

///////////
// Utils //
///////////

Bacon.Observable.prototype.slidingWindowBy = function (lengthObs) {
  var self = this;

  return new Bacon.EventStream(function (sink) {
    var buf = [];
    var length = 0;

    lengthObs.onValue(function (n) {
      length = n;
    });

    self.onValue(function (x) {
      buf.unshift(x);
      buf = buf.slice(0, length);
      sink(new Bacon.Next(buf));
    });

    return function () {};
  });
};

Bacon.separateBy = function (sep, obs) {
  return obs().changes().concat(sep.take(1).flatMap(function () {
    return Bacon.separateBy(sep, obs);
  }));
};

function contains(arr, x) {
  for (var i in arr) {
    if (arr[i].equals(x)) {
      return true;
    }
  }

  return false;
}

///////////
// Snake //
///////////

let _ = Bacon._;

function bindInputs() {
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

function getPosition(input/*, tick*/) {
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

function apple(position) {
  var applePos = randomPos();
  return position
      .filter(function (p) { return p.equals(applePos); })
      .take(1)
      .flatMapLatest(apple.bind(null, position))
      .toProperty(applePos);
}

function game(position) {
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

var repeated = function (game, restart) {
  var gm = function () {
    var tmp = game();
    tmp.onEnd(logRestart);
    return tmp;
  };

  restart.onValue(logClear);
  return Bacon.separateBy(restart, gm);
};

drawGame(size);

var inputs = bindInputs();
var position = getPosition.bind(null, inputs);
var newGame = game.bind(null, position);

repeated(newGame, inputs.restart).onValue(function (e) {
  drawSnake(e.snake);
  drawApple([e.apple]);
  setScore(e.score);
});
