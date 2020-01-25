window.onload = initialize;
interval = null;

function initialize() {
  scoreHeader = document.getElementById('score-header');
  scoreHeader.innerHTML = 'Score: 0';
  gameCanvas = document.getElementById('game-canvas');
  context = gameCanvas.getContext('2d');

  score = 0;
  tileSize = gridSize = 20;
  velocityX = (velocityY = 1) - 1;

  playerX = Math.floor(Math.random() * tileSize);
  playerY = Math.floor(Math.random() * tileSize);
  tail = [];
  tailSize = 4;

  appleX = Math.floor(Math.random() * tileSize);
  appleY = Math.floor(Math.random() * tileSize);

  document.addEventListener('keydown', keyDown);

  interval = setInterval(game, 100);
}

function game() {
  playerX += velocityX;
  playerY += velocityY;

  //bit his tail ?
  for (let i = 0; i < tail.length; i++)
    if (tail[i].x == playerX && tail[i].y == playerY) {
      scoreHeader.innerHTML = 'GAME OVER 😣';
      clearInterval(interval);
      setTimeout(initialize, 1500);
      return;
    }

  if (playerX < 0) playerX = gridSize - 1;
  if (playerX > gridSize - 1) playerX = 0;
  if (playerY < 0) playerY = gridSize - 1;
  if (playerY > gridSize - 1) playerY = 0;

  if (playerX == appleX && playerY == appleY) {
    tailSize++;
    score++;
    scoreHeader.innerHTML = 'Score: ' + score;

    appleX = Math.floor(Math.random() * tileSize);
    appleY = Math.floor(Math.random() * tileSize);
  }

  tail.push({ x: playerX, y: playerY });
  while (tail.length > tailSize - 1) {
    tail.shift();
  }

  draw();
}
function draw() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  context.fillStyle = 'lightgreen';
  for (let i = 0; i < tail.length; i++) {
    context.fillRect(
      tail[i].x * gridSize,
      tail[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }

  context.fillStyle = 'red';
  context.fillRect(
    appleX * gridSize,
    appleY * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

//Controls
function keyDown(event) {
  switch (event.key) {
    case 'ArrowLeft':
      if (velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case 'ArrowUp':
      if (velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case 'ArrowRight':
      if (velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    case 'ArrowDown':
      if (velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
  }
}
