const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const HEIGHT = canvas.height;
const WIDTH = canvas.width;

// Ball const
const BALL_RADIUS = 10;
const BALL_A_COLOR = "red";
const BALL_A_ORIGIN = [50, 50];
const BALL_B_COLOR = "blue";
const BALL_B_ORIGIN = [200, 200];
const BALL_SPEED = 10;

const DIRECTIONS = {
  UP: [0, -BALL_SPEED],
  DOWN: [0, BALL_SPEED],
  LEFT: [-BALL_SPEED, 0],
  RIGHT: [BALL_SPEED, 0],
  NONE: [0, 0],
}

//Ball initial atributes
const BALL_A = {
    pos: BALL_A_ORIGIN,
    color: BALL_A_COLOR,
    mov: 'NONE',
};

const BALL_B = {
    pos: BALL_B_ORIGIN,
    color: BALL_B_COLOR,
    mov: 'NONE',
};

const BALLS = [BALL_A, BALL_B];

// Wall const
const WALL_WIDTH = 20;
const WALL_HEIGHT = 300;
const WALL_COLOR = "gray";

// Walls positions in canvas
const WALLS = [
  {x: 20, y: 100, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 140, y: 10, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 280, y: 60, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 300, y: 480, width: WALL_HEIGHT, height: WALL_WIDTH},
  {x: 450, y: 220, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 520, y: 500, width: WALL_HEIGHT, height: WALL_WIDTH},
  {x: 610, y: 100, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 760, y: 500, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 820, y: 430, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 900, y: 230, width: WALL_HEIGHT, height: WALL_WIDTH},
  {x: 850, y: 320, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 720, y: 500, width: WALL_HEIGHT, height: WALL_WIDTH},
];

const state = {
  balls: BALLS,
  walls: WALLS,
}

// Drawing functions
function drawBall(ball) {
    context.beginPath();
    context.arc(ball.pos[0], ball.pos[1], BALL_RADIUS, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

function drawBalls(balls) {
    balls.forEach((ball) => drawBall(ball));
}

function drawWall(wall) {
    context.beginPath();
    context.rect(wall.x, wall.y, wall.width, wall.height);
    context.fillStyle = WALL_COLOR;
    context.fill();
    context.closePath();
}

function drawWalls(walls) {
    walls.forEach((wall) => drawWall(wall));
}

function draw(state) {
  context.fillStyle = "#639fff";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  drawWalls(state.walls);
  drawBalls(state.balls);
}

function redraw(state){
  context.clearRect(0, 0, WIDTH, HEIGHT);
  draw(state);
}

function endgame(){
  clearInterval(interval);
  context.clearRect(0, 0, WIDTH, HEIGHT);
  context.fillStyle = "white";
  context.textAlign = 'center';
  context.fillText('Atrapado', WIDTH/2, HEIGHT/2);
}

// Ball movement and position functions
function moveBalls(state, event) {
  switch(event.key) {
    case 'w': case 'a': case 's': case 'd': moveBall(state.balls[0], event.key); break
    case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft': moveBall(state.balls[1], event.key); break
  }
}

function moveBall(ball, direction) {
  switch(direction){
    case 'ArrowUp': case 'w': ball.mov = 'UP'; break
    case 'ArrowDown': case 's': ball.mov = 'DOWN'; break
    case 'ArrowLeft': case 'a': ball.mov = 'LEFT'; break
    case 'ArrowRight': case 'd': ball.mov = 'RIGHT'; break
  }
}

function stopBalls(state, event) {
  switch(event.key) {
    case 'w': case 'a': case 's': case 'd': state.balls[0].mov = 'NONE'; break
    case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft': state.balls[1].mov = 'NONE'; break
  }
}

function wallCollide(w, b) {
  if(b[0] >= w.x && b[0] <= w.x+w.width &&
    b[1] >= w.y && b[1] <= w.y+w.height){
    return true;
  }
  return false;
}

function ballCollide(b1, b2) {
  if((b1.pos[0] >= b2.pos[0] && b1.pos[0] <= b2.pos[0]+BALL_RADIUS) ||
    (b1.pos[1] >= b2.pos[1] && b1.pos[1] <= b2.pos[1]+BALL_RADIUS)){
    return true;
  }
  return false;
}

function checkWalls(b) {
  if (b.pos[0] < 0) {
    b.pos[0] = WIDTH;
  }
  if (b.pos[0] > WIDTH){
    b.pos[0] = 0
  }
  if (b.pos[1] < 0){
    b.pos[1] = HEIGHT;
  }
  if(b.pos[1] > HEIGHT){
    b.pos[1] = 0;
  }
}

const add = (a1, a2) => {
  array = new Array;
  a1.forEach((a,i) => array.push(a+a2[i]));
  return array;
};

function timeFlow(state) {
  //if(ballCollide(state.balls[0], state.balls[1])){endgame();};
  state.balls.forEach( b => {
    const test = add(b.pos, DIRECTIONS[b.mov]);
    let pass = true;
    state.walls.forEach(w => {if(wallCollide(w, test)){ pass = false; b.mov = 'NONE'; }});
    if(pass) {
      b.pos = test;
      checkWalls(b);
    }
  });
  redraw(state);
}

//Observables
function receiveInputs(){
  const upKeys = Rx.Observable.fromEvent(document, 'keyup');
  upKeys.subscribe(event => stopBalls(state, event));
  const downKeys = Rx.Observable.fromEvent(document, 'keydown');
  downKeys.subscribe(event => moveBalls(state, event));
}

receiveInputs();
draw(state);

setInterval(timeFlow, 60, state);
