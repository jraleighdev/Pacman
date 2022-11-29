import { DIRECTIONS } from "./enums/moveDirections";
import { Ghost } from "./models/ghost";
import { PacMan } from "./models/pacman";
import { State } from "./state/states";

const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

const pacManFrames: HTMLImageElement = document.getElementById('animations') as HTMLImageElement;
const ghostFrames: HTMLImageElement = document.getElementById('ghosts') as HTMLImageElement;

const createRect = (x: number, y: number, width: number, height: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

let pacman: PacMan;
let ghosts: Ghost[];

const createNewPacMan = () => {
    pacman = new PacMan(State.rectSize, State.rectSize, State.rectSize, State.rectSize, State.rectSize / 5, ctx, pacManFrames);
}

const createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < State.ghostCount * 2; i++) {
        const newGhost = new Ghost(
            9 * State.rectSize + (i % 2 === 0 ? 0 : 1) * State.rectSize,
            10 * State.rectSize + (i % 2 === 0 ? 0 : 1) * State.rectSize,
            State.rectSize,
            State.rectSize,
            pacman.speed / 2,
            State.ghostImageLocations[i % 4].x,
            State.ghostImageLocations[i % 4].y,
            124,
            116,
            6 + i,
            State.randomTargetsForGhosts,
            pacman,
            ghostFrames,
            ctx
        );
        ghosts.push(newGhost);
    }
}

const updateGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].moveProcess();
    }
};

const drawGhosts = () => {
    for (let i = 0; i < ghosts.length; i++) {
        ghosts[i].draw();
    }
};

const restartPacmanAndGhosts = () => {
    createNewPacMan();
    createGhosts();
}

const onGhostCollision = () => {
    State.lives--;
    restartPacmanAndGhosts();
    if (State.lives == 0) {
        console.log('Game Over!')
    }
}

const drawWalls = () => {
    for (let i = 0; i < State.map.length; i++) {
        for (let j = 0; j < State.map[0].length; j++) {
            if(State.map[i][j] === 1) {
                createRect(
                    j * State.rectSize, 
                    i * State.rectSize, 
                    State.rectSize, 
                    State.rectSize, 
                    State.wallColor);
            }
            if (j > 0 && State.map[i][j - 1] == 1) {
                createRect(
                    j * State.rectSize, 
                    i * State.rectSize + State.wallOffset, 
                    State.wallSpaceWidth + State.wallOffset, 
                    State.wallSpaceWidth,
                    State.wallInnerColor)
            }
            if (j < State.map[0].length - 1 && State.map[i][j + 1] == 1) {
                createRect(
                    j * State.rectSize + State.wallOffset, 
                    i * State.rectSize + State.wallOffset, 
                    State.wallSpaceWidth + State.wallOffset, 
                    State.wallSpaceWidth,
                    State.wallInnerColor)
            }
            if (i > 0 && State.map[i - 1][j] == 1) {
                createRect(
                    j * State.rectSize + State.wallOffset, 
                    i * State.rectSize, 
                    State.wallSpaceWidth, 
                    State.wallSpaceWidth + State.wallOffset,
                    State.wallInnerColor)
            }
            if (i < State.map.length - 1 && State.map[i + 1][j] == 1) {
                createRect(
                    j * State.rectSize + State.wallOffset, 
                    i * State.rectSize + State.wallOffset, 
                    State.wallSpaceWidth, 
                    State.wallSpaceWidth + State.wallOffset,
                    State.wallInnerColor)
            }
        }
    }
}

const drawFoods = () => {
    for (let i = 0; i < State.map.length; i++) {
        for (let j = 0; j < State.map[0].length; j++) {
            if (State.map[i][j] == 2) {
                createRect(
                    j * State.rectSize + State.rectSize / 3,
                    i * State.rectSize + State.rectSize / 3,
                    State.rectSize / 3,
                    State.rectSize / 3,
                    "#FEB897"
                );
            }
        }
    }
};

const drawRemainingLives = () => {
    ctx.font = "20px Emulogic";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: ", 220, State.rectSize * (State.map.length + 1));

    for (let i = 0; i < State.lives; i++) {
        ctx.drawImage(
            pacManFrames,
            2 * State.rectSize,
            0,
            State.rectSize,
            State.rectSize,
            350 + i * State.rectSize,
            State.rectSize * State.map.length + 2,
            State.rectSize,
            State.rectSize
        );
    }
};

const drawScore = () => {
    ctx.font = "20px Emulogic";
    ctx.fillStyle = "white";
    ctx.fillText(
        "Score: " + State.score,
        0,
        State.rectSize * (State.map.length + 1)
    );
};



const draw = () => {
    createRect(0, 0, canvas.width, canvas.height, 'black');

    // todo
    drawWalls();
    drawFoods();
    drawGhosts();
    pacman.draw();
    drawScore();
    drawRemainingLives();
}

const update = () => {
    pacman.moveProcess();
    pacman.eat();
    updateGhosts();
    if (pacman.checkGhostCollision(ghosts)) {
        onGhostCollision();
    }
    draw();

    requestAnimationFrame(update);
}

createNewPacMan();
createGhosts();

update();

window.addEventListener('keydown', (event: KeyboardEvent) => {
    const k = event.keyCode;
    setTimeout(() => {
        if (k == 37 || k == 65) {
            // left arrow or a
            console.log('left');
            pacman.nextDirection = DIRECTIONS.LEFT;
        } else if (k == 38 || k == 87) {
            // up arrow or w
            pacman.nextDirection = DIRECTIONS.UP;
        } else if (k == 39 || k == 68) {
            // right arrow or d
            console.log('right')
            pacman.nextDirection = DIRECTIONS.RIGHT;
        } else if (k == 40 || k == 83) {
            // bottom arrow or s
            pacman.nextDirection = DIRECTIONS.BOTTOM;
        }
    }, 1);
})


