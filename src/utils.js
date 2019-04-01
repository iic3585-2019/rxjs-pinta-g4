import { HEIGHT, WIDTH, WALLS, SPEED_UP } from "./constants";

export const add = (a1, a2) => {
    const array = [];
    a1.forEach((a, i) => array.push(a + a2[i]));
    return array;
};

function getRandomNumber( min, max ) {
    return Math.floor( Math.random() * (max - min + 1) + min );
}

export function getRandomPosition(balls = []) {
    let powerUp = SPEED_UP;
    powerUp.pos= [getRandomNumber(0, WIDTH - 1),
        getRandomNumber(0, HEIGHT - 1)];
    if (isEmpty(powerUp, balls)) {
        return powerUp;
    }

    return getRandomPosition(balls);
}

function isEmpty( element, balls ) {
    if ((!WALLS.some( w => wallCollide2(w, element))) || !balls.some( segment => checkCollision( segment, element ) ) ){
        return true
    }
    return false;
}

export function checkCollision(b1, b2) {
    if(b2.pos[0]-b2.radius >= b1.pos[0]+b1.radius ||
      b2.pos[0]+b2.radius <= b1.pos[0]-b1.radius ||
      b2.pos[1]-b2.radius >= b1.pos[1]+b1.radius ||
      b2.pos[1]+b2.radius <= b1.pos[1]-b1.radius){
        return false;
    } 
    return true;
  }

function wallCollide2(w, b) {
    if (
        b[0]-b.radius >= w.x + w.width ||
        b[0]+b.radius <= w.x ||
        b[1]-b.radius >= w.y + w.height ||
        b[1]+b.radius <= w.y
    ) {
        return false;
    }
    return true;
}