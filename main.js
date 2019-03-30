const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const HEIGHT = canvas.height;
const WIDTH = canvas.width;

const add = (a1, a2) => {
  array = new Array;
  a1.forEach((a,i) => array.push(a+a2[i]));
  return array;
};

// Wall const
const WALL_WIDTH = 20;
const WALL_HEIGHT = 100;
const WALL_COLOR = "gray";
// Ball const
const BALL_RADIUS = 10;
const BALL_A_COLOR = "red";
const BALL_A_ORIGIN = [50, 50];
const BALL_B_COLOR = "blue";
const BALL_B_ORIGIN = [200, 200];
const BALL_SPEED = 10;

const directions = {
  UP: [0, -BALL_SPEED],
  DOWN: [0, BALL_SPEED],
  LEFT: [-BALL_SPEED, 0],
  RIGHT: [BALL_SPEED, 0],
  NONE: [0, 0],
}

// Keys
const A_KEYS = { // asdw
    up: 87,
    down: 83,
    left: 65,
    right: 68
};
const B_KEYS = { // arrows
    up: 38,
    down: 40,
    left: 37,
    right: 39
};
const PAUSE_KEY = 80; // p

const WALLS = [
  {x: 20, y: 100, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 80, y: 10, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 300, y: 160, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 200, y: 480, width: WALL_HEIGHT, height: WALL_WIDTH},
  {x: 450, y: 220, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 320, y: 100, width: WALL_HEIGHT, height: WALL_WIDTH},
];

//Falta definir atributos bolas (posicion, direccion, color)
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

const state = {
  balls: BALLS,
  walls: WALLS,
}


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

function draw(state) {
  context.fillStyle = "#639fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawWalls(state.walls);
  drawBalls(state.balls);
}

function moveBalls(state, event) {
  switch(event.key) {
    case 'w': case 'a': case 's': case 'd': moveBall(state.balls[0], event.key); break
    case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft': moveBall(state.balls[1], event.key); break
  }
}

function redraw(state){
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw(state);

}

function moveBall(ball, direction) {
  switch(direction){ 
    case 'ArrowUp': case 'w': ball.mov = 'UP'; break
    case 'ArrowDown': case 's': ball.mov = 'DOWN'; break
    case 'ArrowLeft': case 'a': ball.mov = 'LEFT'; break
    case 'ArrowRight': case 'd': ball.mov = 'RIGHT'; break
  }
}

function wallCollide(w, b) {
  if(b[0] >= w.x && b[0] <= w.x+w.width &&
    b[1] >= w.y && b[1] <= w.y+w.height){
      
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

  // state.walls.forEach(w => {
  //   if(b.pos[0] > w.x && b.pos[0] < w.x+w.width &&
  //     b.pos[1] > w.y && b.pos[1] < w.y + w.height){
  //     b.mov = 'NONE';
  //   }
  // });
  
}

function receiveInputs(){
  // const upKeys = Rx.Observable.fromEvent(document, 'keyup');
  const downKeys = Rx.Observable.fromEvent(document, 'keydown');
  // const keysPressed = new Rx.Subject();
  // upKeys.subscribe(keysPressed);
  downKeys.subscribe(event => moveBalls(state, event));

  
  // keysPressed.subscribe(event => moveBalls(BALLS, event));
}

function timeFlow(state) {
  state.balls.forEach( b => { 
    const test = add(b.pos, directions[b.mov]);
    let pass = true;
    state.walls.forEach(w => {if(wallCollide(w, test)){ pass = false; b.mov = 'NONE'; }}); 
    if(pass) {
      b.pos = test;
      checkWalls(b);
    }
    
  });
  redraw(state);
}

receiveInputs();
draw(state);

setInterval(timeFlow, 60, state);


