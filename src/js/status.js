const score = document.querySelector('#score');
const control = document.querySelector('#control');

export function logRestart() {
  control.textContent = 'Press "r" to restart the game.';
}

export function logControls() {
  control.textContent = 'Use the left and right arrows to play.';
}

export function setScore(points) {
  score.textContent = points;
}
