import {SIZE_X, SIZE_Y} from './constants';

export function Position(x, y) {
  this.x = x;
  this.y = y;

  this.add = (p) => new Position(
    (this.x + p.x + SIZE_X) % SIZE_X,
    (this.y + p.y + SIZE_Y) % SIZE_Y
  );
}

export function getRandomPosition() {
  return new Position(
    Math.floor(Math.random() * SIZE_X),
    Math.floor(Math.random() * SIZE_Y)
  );
}

export function rotateRight(pos) {
  return new Position(-pos.y, pos.x);
}

export function rotateLeft(pos) {
  return new Position(pos.y, -pos.x);
}
