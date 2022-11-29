import { DIRECTIONS } from "~/enums/moveDirections";
import { Queue } from "~/interfaces/queue";
import { Target } from "~/interfaces/targets";
import { State } from "~/state/states";
import { PacMan } from "./pacman";

export class Ghost {

    public randomTargetIndex = Math.floor(Math.random() * 4);
    public target: Target; 
    public currentFrame = 0;
    public frameCount = 0;

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public speed: number,
        public imageX: number,
        public imageY: number,
        public imageWidth: number,
        public imageHeight: number,
        public range: number,
        public randomTargetsForGhosts: Target[],
        public pacman: PacMan,
        public images: HTMLImageElement,
        public ctx: CanvasRenderingContext2D,
        public direction: DIRECTIONS = DIRECTIONS.RIGHT
    ) {
        this.target = this.randomTargetsForGhosts[this.randomTargetIndex];

        setInterval(() => {
            this.changeRandomDirection();
        }, 10000);
    }

    isInRange(): boolean {
        const xDistance = Math.abs(this.pacman.getMapX() - this.getMapX());
        const yDistance = Math.abs(this.pacman.getMapY() - this.getMapY());
        if (
            Math.sqrt(xDistance * xDistance + yDistance * yDistance) <=
            this.range
        ) {
            return true;
        }
        return false;
    }

    changeRandomDirection() {
        const addition = 1;
        this.randomTargetIndex += addition;
        this.randomTargetIndex = this.randomTargetIndex % 4;
    }

    moveProcess() {
        if (this.isInRange()) {
            this.target = this.pacman;
        } else {
            this.target = this.randomTargetsForGhosts[this.randomTargetIndex];
        }
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollisions()) {
            this.moveBackwards();
            return;
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTIONS.RIGHT: // Right
                this.x -= this.speed;
                break;
            case DIRECTIONS.UP: // Up
                this.y += this.speed;
                break;
            case DIRECTIONS.LEFT: // Left
                this.x += this.speed;
                break;
            case DIRECTIONS.BOTTOM: // Bottom
                this.y -= this.speed;
                break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTIONS.RIGHT: // Right
                this.x += this.speed;
                break;
            case DIRECTIONS.UP: // Up
                this.y -= this.speed;
                break;
            case DIRECTIONS.LEFT: // Left
                this.x -= this.speed;
                break;
            case DIRECTIONS.BOTTOM: // Bottom
                this.y += this.speed;
                break;
        }
    }

    checkCollisions() {
        let isCollided = false;
        if (
            State.map[Math.floor(this.y / State.rectSize)][
                Math.floor(this.x / State.rectSize)
            ] == 1 ||
            State.map[Math.floor(this.y / State.rectSize + 0.9999)][
                Math.floor(this.x / State.rectSize)
            ] == 1 ||
            State.map[Math.floor(this.y / State.rectSize)][
                Math.floor(this.x / State.rectSize + 0.9999)
            ] == 1 ||
            State.map[Math.floor(this.y / State.rectSize + 0.9999)][
                Math.floor(this.x / State.rectSize + 0.9999)
            ] == 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    changeDirectionIfPossible() {
        const tempDirection = this.direction;
        this.direction = this.calculateNewDirection(
            State.map,
            Math.floor(this.target.x / State.rectSize),
            Math.floor(this.target.y / State.rectSize)
        );
        if (typeof this.direction == "undefined") {
            this.direction = tempDirection;
            return;
        }
        if (
            this.getMapY() != this.getMapYRightSide() &&
            (this.direction == DIRECTIONS.LEFT ||
                this.direction == DIRECTIONS.RIGHT)
        ) {
            this.direction = DIRECTIONS.UP;
        }
        if (
            this.getMapX() != this.getMapXRightSide() &&
            this.direction == DIRECTIONS.UP
        ) {
            this.direction = DIRECTIONS.LEFT;
        }
        this.moveForwards();
        if (this.checkCollisions()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
        // console.log(this.direction);
    }

    calculateNewDirection(map: number[][], destX, destY) {
        const mp: number[][] = [];
        for (let i = 0; i < map.length; i++) {
            mp[i] = map[i].slice();
        }

        const queue: Queue[] = [
            {
                x: this.getMapX(),
                y: this.getMapY(),
                rightX: this.getMapXRightSide(),
                rightY: this.getMapYRightSide(),
                moves: [],
            },
        ];
        while (queue.length > 0) {
            const poped: Queue = queue.shift() as Queue;
            if (poped?.x == destX && poped?.y == destY) {
                return poped?.moves[0];
            } else {
                mp[poped.y][poped.x] = 1;
                const neighborList = this.addNeighbors(poped, mp);
                for (let i = 0; i < neighborList.length; i++) {
                    queue.push(neighborList[i]);
                }
            }
        }

        return 1; // direction
    }

    addNeighbors(poped: Queue, mp: number[][]) {
        const queue: Queue[] = [];
        const numOfRows = mp.length;
        const numOfColumns = mp[0].length;

        if (
            poped.x - 1 >= 0 &&
            poped.x - 1 < numOfRows &&
            mp[poped.y][poped.x - 1] != 1
        ) {
            const tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTIONS.LEFT);
            queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
        }
        if (
            poped.x + 1 >= 0 &&
            poped.x + 1 < numOfRows &&
            mp[poped.y][poped.x + 1] != 1
        ) {
            const tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTIONS.RIGHT);
            queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
        }
        if (
            poped.y - 1 >= 0 &&
            poped.y - 1 < numOfColumns &&
            mp[poped.y - 1][poped.x] != 1
        ) {
            const tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTIONS.UP);
            queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
        }
        if (
            poped.y + 1 >= 0 &&
            poped.y + 1 < numOfColumns &&
            mp[poped.y + 1][poped.x] != 1
        ) {
            const tempMoves = poped.moves.slice();
            tempMoves.push(DIRECTIONS.BOTTOM);
            queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
        }
        return queue;
    }

    getMapX() {
        const mapX = Math.floor(this.x / State.rectSize);
        return mapX;
    }

    getMapY() {
        const mapY = Math.floor(this.y / State.rectSize);
        return mapY;
    }

    getMapXRightSide() {
        const mapX = Math.floor((this.x * 0.99 + State.rectSize) / State.rectSize);
        return mapX;
    }

    getMapYRightSide() {
        const mapY = Math.floor((this.y * 0.99 + State.rectSize) / State.rectSize);
        return mapY;
    }

    changeAnimation() {
        this.currentFrame =
            this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw() {
        this.ctx.save();
        this.ctx.drawImage(
            this.images,
            this.imageX,
            this.imageY,
            this.imageWidth,
            this.imageHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.ctx.restore();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "red";
        this.ctx.arc(
            this.x + State.rectSize / 2,
            this.y + State.rectSize / 2,
            this.range * State.rectSize,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
    }
}
