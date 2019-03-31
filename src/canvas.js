import { BALLS, WALLS, WALL_COLOR, BALL_RADIUS, DIRECTIONS } from "./constants";

export const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");
export const HEIGHT = canvas.height;
export const WIDTH = canvas.width;

export function drawBall(ball) {
    context.beginPath();
    context.arc(ball.pos[0], ball.pos[1], BALL_RADIUS, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.closePath();
}

export function drawBalls(balls) {
    balls.forEach(ball => drawBall(ball));
}

export function drawWall(wall) {
    context.beginPath();
    context.rect(wall.x, wall.y, wall.width, wall.height);
    context.fillStyle = WALL_COLOR;
    context.fill();
    context.closePath();
}

export function drawWalls(walls) {
    walls.forEach(wall => drawWall(wall));
}

export function draw(state) {
    context.fillStyle = "#ABD6E8";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawWalls(state.walls);
    drawBalls(state.balls);
}

export function drawEnd() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Atrapado", WIDTH/2, HEIGHT/2);
}
