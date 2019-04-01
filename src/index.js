import { Observable } from "rxjs";
import _ from 'lodash';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { add } from "./utils";
import { BALLS, BALL_A, BALL_B, WALLS, BALL_RADIUS, DIRECTIONS, WALL_WIDTH, WALL_HEIGHT, BALL_SPEED, FRAMERATE } from "./constants";
import {
  draw,
  WIDTH,
  HEIGHT,
  context,
  drawEnd,
} from "./canvas";

function update(balls) {
  context.clearRect(0, 40, WIDTH, HEIGHT);
  draw(balls);
}

function endgame(){

  /* TODO: The function is being called, but the results aren't showing.
   Even then, you CAN draw cartain things (ex: move ball1 to other spot and
    doing draw works)
  */
  drawEnd("Atrapado!");
}

function stopBall(event) {
  switch (event.key) {
    case "w":
    case "a":
    case "s":
    case "d":
      return [0, "NONE"];
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowRight":
    case "ArrowLeft":
      return [1, "NONE"];
  }
}

function nextBallMove(event) {
  switch (event.key) {
    case "w":
    case "a":
    case "s":
    case "d":
      return [0, nextDirection(event.key)];
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowRight":
    case "ArrowLeft":
      return [1, nextDirection(event.key)];
  }
}

function nextDirection(direction) {
  let output = ''
  switch (direction) {
    case "ArrowUp":
    case "w":
      output = "UP";
      break;
    case "ArrowDown":
    case "s":
      output = "DOWN";
      break;
    case "ArrowLeft":
    case "a":
      output = "LEFT";
      break;
    case "ArrowRight":
    case "d":
      output = "RIGHT";
      break;
  }
  return output;

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
  if(b2.pos[0]-BALL_RADIUS >= b1.pos[0]+BALL_RADIUS ||
    b2.pos[0]+BALL_RADIUS <= b1.pos[0]-BALL_RADIUS ||
    b2.pos[1]-BALL_RADIUS >= b1.pos[1]+BALL_RADIUS ||
    b2.pos[1]+BALL_RADIUS <= b1.pos[1]-BALL_RADIUS){
      return false;
    }
  clearInterval(timeInterval);
  endgame(keyDown$);
  return true;
}

function checkWalls(b) {
  if (b.pos[0] < 0) b.pos[0] = WIDTH;
  if (b.pos[0] > WIDTH) b.pos[0] = 0;
  if (b.pos[1] < 40) b.pos[1] = HEIGHT;
  if (b.pos[1] > HEIGHT) b.pos[1] = 40;
}

function move(balls, instruction) {
  let output = _.clone(balls);
  output[instruction[0]].mov = instruction[1];
  balls.forEach( b => {
    const nextPosition = add(b.pos, DIRECTIONS[b.mov]);

    let canMove = true;
    WALLS.forEach(w => {
      if(wallCollide(w, nextPosition)){
        canMove = false;
        switch(b.mov) {
          case 'LEFT': b.pos = add(b.pos, [w.x + w.width-b.pos[0]+BALL_RADIUS, 0]); break
          case 'RIGHT': b.pos = add(b.pos, [-(b.pos[0]+BALL_RADIUS-w.x), 0]); break
          case 'UP': b.pos = add(b.pos, [0,-(b.pos[1]-BALL_RADIUS-w.y-w.height)]); break
          case 'DOWN': b.pos = add(b.pos, [0,(w.y-b.pos[1]-BALL_RADIUS)]); break
        }
          b.mov = 'NONE';
        }
      });
      if(canMove) { b.pos = nextPosition; checkWalls(b);
    }
  });
  return output;
}

draw([BALL_A, BALL_B]);

let time$ = Observable.interval(50);
let keyDown$ = Observable.fromEvent( document, 'keydown' );
let balls$ = time$
    .withLatestFrom(keyDown$, ( _, keyDown ) => keyDown)
    .map((e)=>nextBallMove(e))
    .distinctUntilChanged()
    .scan(move, [BALL_A, BALL_B])
    .share();

let scene$ = Observable.combineLatest(balls$, (state) => state);

let game$ = Observable.interval( 1000 / FRAMERATE, animationFrame )
    .withLatestFrom( scene$, ( _, balls ) => balls )
    .takeWhile( balls => !ballCollide( balls[0], balls[1] ) && TIMER > 0)
;

game$.subscribe( {
    next: ( scene ) => update(scene),
    complete: console.log
} );

function drawTime() {
    context.fillStyle = "white";
    context.fillRect(WIDTH/2 - 20, 0, WIDTH/2+20, 40);
    context.font = '12px Courier New';
    context.fillStyle = "black";
    context.textAlign = "center";
    decrease();
    context.fillText(TIMER, WIDTH/2, 20);
}

let TIMER = 10;
function decrease(){
    TIMER -=1;
    if (TIMER <= 0){
      drawEnd("Se acabo el tiempo!");
      clearInterval(timeInterval);
    }
};
const timeInterval = setInterval(drawTime, 1000);



// const mainSubject = new Subject();
// mainSubject.subscribe(timeFlow);


// var time = setInterval(timeFlow, 60, state, keysSubscription);
