const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.fillStyle = "#639fff";
context.fillRect(0, 0, canvas.width, canvas.height);


// Wall const
const WALL_WIDTH = 20;
const WALL_HEIGHT = 100;
const WALL_COLOR = "gray";
// Ball const
const BALL_RADIUS = 10;
const BALL_A_COLOR = "red";
const BALL_B_COLOR = "blue";
const BALL_SPEED = 240;
// Keys
const A_KEYS = {
    up: 87,
    down: 83,
    left: 65,
    right: 68
};
const B_KEYS = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
};
const PAUSE_KEY = 80;

const WALLS = [
  {x: 20, y: 100, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 80, y: 10, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 300, y: 160, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 200, y: 480, width: WALL_HEIGHT, height: WALL_WIDTH},
  {x: 450, y: 220, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 320, y: 100, width: WALL_HEIGHT, height: WALL_WIDTH},
];

//Falta definir atributos bolas (posicion, direccion, color)
const BALL_A;
const BALL_B;
const BALLS = [BALL_A, BALL_B];


function drawBall(ball) {
    context.beginPath();
    context.arc(ball.position.x, ball.position.y, BALL_RADIUS, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function drawBalls(balls) {
    balls.forEach((ball) => drawBall(ball));
}

function drawWall(wall) {
    context.beginPath();
    context.rect(
        wall.x,
        wall.y,
        wall.width,
        wall.height
    );
    context.fillStyle = WALL_COLOR;
    context.fill();
    context.closePath();
}

function drawWalls(walls) {
    walls.forEach((wall) => drawWall(wall));
}

drawWalls(WALLS);
