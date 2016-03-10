export function drawBoard(size) {
  let game = document.getElementById('game');

  for (let i = 0; i < size.y; i++) {
    let row = document.createElement('div');

    row.className = 'row';

    for (let j = 0; j < size.x; j++) {
      let cell = document.createElement('span');

      cell.className = 'cell';
      row.appendChild(cell);
    }

    game.appendChild(row);
  }
}

export function colorCells(classname) {
  let game = document.getElementById('game');

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
