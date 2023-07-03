var field = document.getElementById("field");
var ball = document.getElementById("ball");
var scoreDisplay = document.getElementById("score");

var fieldWidth = field.offsetWidth;
var fieldHeight = field.offsetHeight;
var ballWidth = ball.offsetWidth;
var ballHeight = ball.offsetHeight;

var score = 0;

// Function to move the ball
function moveBall() {
  var ballX = ball.offsetLeft;
  var ballY = ball.offsetTop;

  // Move the ball horizontally
  ballX += 5;

  // Check if the ball reaches the right goal
  if (ballX + ballWidth >= fieldWidth) {
    // Check if the ball is within the goal's vertical range
    var goalTop = fieldHeight / 2 - ballHeight / 2;
    var goalBottom = fieldHeight / 2 + ballHeight / 2;

    if (ballY >= goalTop && ballY <= goalBottom) {
      // Goal scored!
      score++;
      scoreDisplay.textContent = score;
    }
    
    // Reset the ball position
    resetBall();
    return;
  }

  // Move the ball vertically based on user input
  if (userMoveUp && ballY > 0) {
    ballY -= 5;
  } else if (userMoveDown && ballY + ballHeight < fieldHeight) {
    ballY += 5;
  }

  // Update the ball position
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  // Move the ball in the next frame
  requestAnimationFrame(moveBall);
}

// Function to reset the ball position
function resetBall() {
  ball.style.left = "0";
  ball.style.top = fieldHeight / 2 - ballHeight / 2 + "px";
}

// Variables to track user input
var userMoveUp = false;
var userMoveDown = false;

// Function to handle user input
function handleUserInput(event) {
  if (event.code === "ArrowUp") {
    userMoveUp = event.type === "keydown";
  } else if (event.code === "ArrowDown") {
    userMoveDown = event.type === "keydown";
  } else if (event.code === "Space" && event.type === "keydown") {
    // Shoot the ball
    var ballX = ball.offsetLeft;
    var ballY = ball.offsetTop;
    var goalX = fieldWidth - ballWidth;
    var goalY = fieldHeight / 2 - ballHeight / 2;

    if (ballX >= goalX && ballY >= goalY && ballY <= goalY + ballHeight) {
      // Goal scored!
      score++;
      scoreDisplay.textContent = score;
    }
  }
}

// Event listeners for user input
document.addEventListener("keydown", handleUserInput);
document.addEventListener("keyup", handleUserInput);

// Start the game
moveBall();
