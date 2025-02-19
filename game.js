const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // Размер объекта
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let score = 0;

let platform = {
  x: 150,
  y: 380,
  width: 100,
  height: 20,
  speed: 5,
};

let fallingObject = {
  x: Math.floor(Math.random() * (canvas.width / scale)) * scale,
  y: 0,
  size: scale,
  speed: 2,
};

document.addEventListener('keydown', movePlatform);

function gameLoop() {
  if (gameOver()) {
    alert('Игра окончена! Ваши очки: ' + score);
    resetGame();
    return;
  }

  setTimeout(function() {
    clearCanvas();
    moveFallingObject();
    drawPlatform();
    drawFallingObject();
    updateScore();
    gameLoop();
  }, 100);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPlatform() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
}

function movePlatform(event) {
  if (event.key === 'ArrowLeft' && platform.x > 0) {
    platform.x -= platform.speed;
  }
  if (event.key === 'ArrowRight' && platform.x + platform.width < canvas.width) {
    platform.x += platform.speed;
  }
}

function drawFallingObject() {
  ctx.fillStyle = 'red';
  ctx.fillRect(fallingObject.x, fallingObject.y, fallingObject.size, fallingObject.size);
}

function moveFallingObject() {
  fallingObject.y += fallingObject.speed;

  if (fallingObject.y > canvas.height) {
    fallingObject.y = 0;
    fallingObject.x = Math.floor(Math.random() * (canvas.width / scale)) * scale;
  }

  if (fallingObject.y + fallingObject.size >= platform.y &&
    fallingObject.x >= platform.x && fallingObject.x <= platform.x + platform.width) {
    score++;
    fallingObject.y = 0;
    fallingObject.x = Math.floor(Math.random() * (canvas.width / scale)) * scale;
  }
}

function updateScore() {
  document.getElementById('score').textContent = 'Очки: ' + score;
}

function gameOver() {
  return false; // Для этой игры можно добавить логику конца игры по желанию
}

function resetGame() {
  score = 0;
  fallingObject.y = 0;
  platform.x = 150;
  gameLoop();
}

gameLoop(); // Начало игры
