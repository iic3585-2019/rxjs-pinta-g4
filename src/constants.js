
export const FRAMERATE = 60;
// Wall export const
export const WALL_WIDTH = 20;
export const WALL_HEIGHT = 100;
export const WALL_COLOR = "gray";
// Ball export const
export const BALL_RADIUS = 10;
export const BALL_A_COLOR = "red";
export const BALL_A_ORIGIN = [50, 50];
export const BALL_B_COLOR = "blue";
export const BALL_B_ORIGIN = [200, 200];
export const BALL_SPEED = 10; // nota: no sobrepasar de 40 o más

export const DIRECTIONS = {
  UP: [0, -BALL_SPEED],
  DOWN: [0, BALL_SPEED],
  LEFT: [-BALL_SPEED, 0],
  RIGHT: [BALL_SPEED, 0],
  NONE: [0, 0]
};

// Keys
export const A_KEYS = {
  // asdw
  up: 87,
  down: 83,
  left: 65,
  right: 68
};
export const B_KEYS = {
  // arrows
  up: 38,
  down: 40,
  left: 37,
  right: 39
};
export const PAUSE_KEY = 80; // p

export const WALLS = [
  {x: 20, y: 100, width: WALL_WIDTH, height: WALL_HEIGHT},
  {x: 140, y: 50, width: WALL_WIDTH, height: WALL_HEIGHT},
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

export const BALL_A = {
  pos: BALL_A_ORIGIN,
  color: BALL_A_COLOR,
  mov: "NONE"
};

export const BALL_B = {
  pos: BALL_B_ORIGIN,
  color: BALL_B_COLOR,
  mov: "NONE"
};

export const BALLS = [BALL_A, BALL_B];
