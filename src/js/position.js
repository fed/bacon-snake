const SIZE_X = 20;
const SIZE_Y = 20;

export function Pos(x, y) {
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

export const size = new Pos(SIZE_X, SIZE_Y);

export function randomPos() {
  return new Pos(
    Math.floor(Math.random() * SIZE_X),
    Math.floor(Math.random() * SIZE_Y)
  );
}

export function rotateRight(pos) {
  return new Pos(-pos.y, pos.x);
}

export function rotateLeft(pos) {
  return new Pos(pos.y, -pos.x);
}
