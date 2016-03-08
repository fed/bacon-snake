// @TODO: Make functional
export function drawBoard(size) {
  let game = document.getElementById('game');

  for (let i = 0; i < size.x; i++) {
    let row = document.createElement('div');
    row.className = 'row';

    for (let j = 0; j < size.y; j++) {
      let cell = document.createElement('span');
      cell.className = 'cell';
      row.appendChild(cell);
    }

    game.appendChild(row);
  }
}

// @TODO: Refactor using vanilla js
export function colorCells(klass) {
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

export const drawApple = colorCells('apple');
export const drawSnake = colorCells('snake');
