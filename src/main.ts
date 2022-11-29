const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

const pacManFrames: HTMLImageElement = document.getElementById('animations') as HTMLImageElement;
const ghostFrames: HTMLImageElement = document.getElementById('ghosts') as HTMLImageElement;

const createRect = (x: number, y: number, width: number, height: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

const fps = 30;
const rectSize = 20;
const wallColor = '#342DCA';
const wallSpaceWidth = rectSize / 1.5;
const wallOffset = (rectSize - wallSpaceWidth) / 2;
const wallInnerColor = 'black';
let score = 0;

const map = [
  /*1*/  [1,1,1,1,1 ,1,1,1,1,1 ,1, 1,1,1,1,1, 1,1,1,1,1],
  /*2*/  [1,2,2,2,2 ,2,2,2,2,2 ,1, 2,2,2,2,2 ,2,2,2,2,1],
  /*3*/  [1,2,1,1,1 ,2,1,1,1,2 ,1, 2,1,1,1,2 ,1,1,1,2,1],
  /*4*/  [1,2,1,1,1 ,2,1,1,1,2 ,1, 2,1,1,1,2 ,1,1,1,2,1],
  /*5*/  [1,2,2,2,2 ,2,2,2,2,2 ,2, 2,2,2,2,2 ,2,2,2,2,1],
  /*6*/  [1,2,1,1,1 ,2,1,2,1,1 ,1, 1,1,2,1,2 ,1,1,1,2,1],
  /*7*/  [1,2,2,2,2 ,2,1,2,2,2 ,1, 2,2,2,1,2 ,2,2,2,2,1],
  /*8*/  [1,1,1,1,1 ,2,1,1,1,2 ,1, 2,1,1,1,2 ,1,1,1,1,1],
  /*9*/  [0,0,0,0,1 ,2,1,2,2,2 ,2, 2,2,2,1,2 ,1,0,0,0,0],
  /*10*/ [1,1,1,1,1 ,2,1,2,1,1 ,2, 1,1,2,1,2 ,1,1,1,1,1],
  /*11*/ [2,2,2,2,2 ,2,2,2,1,2 ,2, 2,1,2,2,2 ,2,2,2,2,2],
  /*12*/ [1,1,1,1,1 ,2,1,2,1,2 ,2, 2,1,2,1,2 ,1,1,1,1,1],
  /*13*/ [0,0,0,0,1 ,2,1,2,1,1 ,1, 1,1,2,1,2 ,1,0,0,0,0],
  /*14*/ [0,0,0,0,1 ,2,1,2,2,2 ,2, 2,2,2,1,2 ,1,0,0,0,0],
  /*15*/ [1,1,1,1,1 ,2,2,2,1,1 ,1, 1,1,2,2,2 ,1,1,1,1,1],
  /*16*/ [1,2,2,2,2 ,2,2,2,2,2 ,1, 2,2,2,2,2 ,2,2,2,2,1],
  /*17*/ [1,2,1,1,1 ,2,1,1,1,2 ,1, 2,1,1,1,2 ,1,1,1,2,1],
  /*18*/ [1,2,2,2,1 ,2,2,2,2,2 ,2, 2,2,2,2,2 ,1,2,2,2,1],
  /*19*/ [1,1,2,2,1 ,2,1,2,1,1 ,1, 1,1,2,1,2 ,1,2,2,1,1],
  /*20*/ [1,2,2,2,2 ,2,1,2,2,2 ,1, 2,2,2,1,2 ,2,2,2,2,1],
  /*21*/ [1,2,1,1,1 ,1,1,1,1,2 ,1, 2,1,1,1,1 ,1,1,1,2,1],
  /*22*/ [1,2,2,2,2 ,2,2,2,2,2 ,2, 2,2,2,2,2 ,2,2,2,2,1],
  /*23*/ [1,1,1,1,1 ,1,1,1,1,1 ,1, 1,1,1,1,1 ,1,1,1,1,1]
];

const drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if(map[i][j] === 1) {
                createRect(
                    j * rectSize, 
                    i * rectSize, 
                    rectSize, 
                    rectSize, 
                    wallColor);
            }
            if (j > 0 && map[i][j - 1] == 1) {
                createRect(
                    j * rectSize, 
                    i * rectSize + wallOffset, 
                    wallSpaceWidth + wallOffset, 
                    wallSpaceWidth,
                    wallInnerColor)
            }
            if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                createRect(
                    j * rectSize + wallOffset, 
                    i * rectSize + wallOffset, 
                    wallSpaceWidth + wallOffset, 
                    wallSpaceWidth,
                    wallInnerColor)
            }
            if (i > 0 && map[i - 1][j] == 1) {
                createRect(
                    j * rectSize + wallOffset, 
                    i * rectSize, 
                    wallSpaceWidth, 
                    wallSpaceWidth + wallOffset,
                    wallInnerColor)
            }
            if (i < map.length - 1 && map[i + 1][j] == 1) {
                createRect(
                    j * rectSize + wallOffset, 
                    i * rectSize + wallOffset, 
                    wallSpaceWidth, 
                    wallSpaceWidth + wallOffset,
                    wallInnerColor)
            }
        }
    }
}

const update = () => {
    // todo
}

const draw = () => {
    createRect(0, 0, canvas.width, canvas.height, 'black');
    // todo
    drawWalls();
}

const gameLoop = () => {
    update();
    draw();
}

const gameInterval = setInterval(gameLoop, 1000 / fps);


