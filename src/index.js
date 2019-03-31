import { Observable } from "rxjs";
import { add } from "./utils";
import { BALLS, WALLS, WALL_COLOR, BALL_RADIUS, directions } from "./constants";
import {
  draw,
  drawWalls,
  drawWall,
  drawBalls,
  drawBall,
  WIDTH,
  HEIGHT,
  context
} from "./canvas";
const state = {
  balls: BALLS,
  walls: WALLS
};

function moveBalls(state, event) {
  switch (event.key) {
    case "w":
    case "a":
    case "s":
    case "d":
      moveBall(state.balls[0], event.key);
      break;
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowRight":
    case "ArrowLeft":
      moveBall(state.balls[1], event.key);
      break;
  }
}

function redraw(state) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw(state);
}

function moveBall(ball, direction) {
  switch (direction) {
    case "ArrowUp":
    case "w":
      ball.mov = "UP";
      break;
    case "ArrowDown":
    case "s":
      ball.mov = "DOWN";
      break;
    case "ArrowLeft":
    case "a":
      ball.mov = "LEFT";
      break;
    case "ArrowRight":
    case "d":
      ball.mov = "RIGHT";
      break;
  }
}

function wallCollide(w, b) {
  if (
    b[0] >= w.x &&
    b[0] <= w.x + w.width &&
    b[1] >= w.y &&
    b[1] <= w.y + w.height
  ) {
    return true;
  }
  return false;
}

function checkWalls(b) {
  if (b.pos[0] < 0) {
    b.pos[0] = WIDTH;
  }
  if (b.pos[0] > WIDTH) {
    b.pos[0] = 0;
  }
  if (b.pos[1] < 0) {
    b.pos[1] = HEIGHT;
  }
  if (b.pos[1] > HEIGHT) {
    b.pos[1] = 0;
  }

  // state.walls.forEach(w => {
  //   if(b.pos[0] > w.x && b.pos[0] < w.x+w.width &&
  //     b.pos[1] > w.y && b.pos[1] < w.y + w.height){
  //     b.mov = 'NONE';
  //   }
  // });
}

function receiveInputs() {
  // const upKeys = Rx.Observable.fromEvent(document, 'keyup');
  const downKeys = Observable.fromEvent(document, "keydown");
  // const keysPressed = new Rx.Subject();
  // upKeys.subscribe(keysPressed);
  downKeys.subscribe(event => moveBalls(state, event));

  // keysPressed.subscribe(event => moveBalls(BALLS, event));
}

function timeFlow(state) {
  state.balls.forEach(b => {
    /* TODO: directions hace referencia al scope de la constante
    seria mejor pasarlo como parametro */
    const test = add(b.pos, directions[b.mov]);
    let pass = true;
    state.walls.forEach(w => {
      if (wallCollide(w, test)) {
        pass = false;
        b.mov = "NONE";
      }
    });
    if (pass) {
      b.pos = test;
      checkWalls(b);
    }
  });
  redraw(state);
}

receiveInputs();
draw(state);

setInterval(timeFlow, 60, state);
