import { Observable, Subject } from "rxjs";
import { add } from "./utils";
import { BALLS, WALLS, WALL_COLOR, BALL_RADIUS, DIRECTIONS, WALL_WIDTH, WALL_HEIGHT, BALL_SPEED } from "./constants";
import {
  draw,
  drawWalls,
  drawWall,
  drawBalls,
  drawBall,
  WIDTH,
  HEIGHT,
  context,
  drawEnd,
} from "./canvas";

const state = {
  balls: BALLS,
  walls: WALLS
};

function redraw(state) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  draw(state);
}

function endgame(keysSubscription){
  keysSubscription.unsubscribe();
  clearInterval(time);
  /* TODO: The function is being called, but the results aren't showing.
   Even then, you CAN draw cartain things (ex: move ball1 to other spot and
    doing draw works)
  */
  drawEnd();
}

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

function stopBalls(state, event) {
  switch(event.key) {
    case 'w': case 'a': case 's': case 'd': state.balls[0].mov = 'NONE'; break
    case 'ArrowUp': case 'ArrowDown': case 'ArrowRight': case 'ArrowLeft': state.balls[1].mov = 'NONE'; break
  }
}

function wallCollide(w, b) {
  if (
    b[0]-BALL_RADIUS >= w.x + w.width ||
    b[0]+BALL_RADIUS <= w.x ||
    b[1]-BALL_RADIUS >= w.y + w.height ||
    b[1]+BALL_RADIUS <= w.y
  ) {
    return false;
  }
  return true;
}

function ballCollide(b1, b2) {
  if(b2.pos[0]-BALL_RADIUS > b1.pos[0]+BALL_RADIUS ||
    b2.pos[0]+BALL_RADIUS < b1.pos[0]-BALL_RADIUS ||
    b2.pos[1]-BALL_RADIUS > b1.pos[1]+BALL_RADIUS ||
    b2.pos[1]+BALL_RADIUS < b1.pos[1]-BALL_RADIUS){
      return false;
    }
  return true;
}

function checkWalls(b) {
  if (b.pos[0] < 0) b.pos[0] = WIDTH;
  if (b.pos[0] > WIDTH) b.pos[0] = 0;
  if (b.pos[1] < 0) b.pos[1] = HEIGHT;
  if (b.pos[1] > HEIGHT) b.pos[1] = 0;
}

function receiveInputs(){
  /* commented due to werid behavior */
  // const upKeys = Observable.fromEvent(document, 'keyup');
  // upKeys.subscribe(event => stopBalls(state, event));
  const downKeys = Observable.fromEvent(document, 'keydown');
  return downKeys.subscribe(event => moveBalls(state, event));
}

function timeFlow(state, keysSubscription) {
  /* TODO: directions hace referencia al scope de la constante
    seria mejor pasarlo como parametro */
  if(ballCollide(state.balls[0], state.balls[1])){endgame(keysSubscription);};
  state.balls.forEach( b => {
    const test = add(b.pos, DIRECTIONS[b.mov]);
    let pass = true;
    state.walls.forEach(w => {
      if(wallCollide(w, test)){
        pass = false;
        switch(b.mov) {
          case 'LEFT': b.pos = add(b.pos, [w.x + w.width-b.pos[0]+BALL_RADIUS, 0]); break
          case 'RIGHT': b.pos = add(b.pos, [-(b.pos[0]+BALL_RADIUS-w.x), 0]); break
          case 'UP': b.pos = add(b.pos, [0,-(b.pos[1]-BALL_RADIUS-w.y-w.height)]); break
          case 'DOWN': b.pos = add(b.pos, [0,(w.y-b.pos[1]-BALL_RADIUS)]); break
        }
        b.mov = 'NONE';
      }
    });
    if(pass) { b.pos = test; checkWalls(b);}
  });
  redraw(state);
}

const keysSubscription = receiveInputs();

// const mainSubject = new Subject();
// mainSubject.subscribe(timeFlow);
draw(state);

var time = setInterval(timeFlow, 60, state, keysSubscription);