import range from 'lodash/range';

const game = document.getElementById('game');

export function drawBoard(size) {
  range(size.y).forEach(() => {
    let row = document.createElement('div');

    row.className = 'row';

    range(size.x).forEach(() => {
      let cell = document.createElement('span');

      cell.className = 'cell';
      row.appendChild(cell);
    });

    game.appendChild(row);
  });
}

export function colorCells(classname) {
  return function (points) {
    let rows = Array.from(game.querySelectorAll('.row'));

    Array.from(game.querySelectorAll('.' + classname)).forEach((cell) => {
      cell.classList.remove(classname);
    });

    points.forEach((point) => {
      let row = rows[point.y];

      row.children[point.x].classList.add(classname);
    });
  };
}

export const drawApple = colorCells('apple');
export const drawSnake = colorCells('snake');
