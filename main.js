const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2,
    radius: 10,
    color: '#61dafb'
};

let paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2,
    color: '#61dafb',
    speed: 7,
    rightPressed: false,
    leftPressed: false
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.rightPressed = true;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.rightPressed = false;
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

function movePaddle() {
    if(paddle.rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += paddle.speed;
    } else if(paddle.leftPressed && paddle.x > 0) {
        paddle.x -= paddle.speed;
    }
}

function collisionDetection() {
    if(ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if(ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if(ball.y + ball.dy > canvas.height - ball.radius) {
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            document.location.reload();
        }
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    movePaddle();
    collisionDetection();

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(updateGame);
}

updateGame();
