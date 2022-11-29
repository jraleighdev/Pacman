import { DIRECTIONS } from "~/enums/moveDirections";
import { State } from "~/state/states";
import { Ghost } from "./ghost";

export class PacMan {

    public nextDirection = DIRECTIONS.RIGHT;
    private frameCount = 7;
    private currentFrame = 1;

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public speed: number,
        public ctx: CanvasRenderingContext2D,
        public images: HTMLImageElement,
        public direction: DIRECTIONS = DIRECTIONS.RIGHT
    ) { 
        setInterval(() => {
            this.changeAnimation();
        }, 100);
    } 

    moveProcess(): void {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackWards();
            return;
        }
    }

    eat(): void {
        for (let i = 0; i < State.map.length; i++) {
            for (let j = 0; j < State.map[0].length; j++) {
                if (
                    State.map[i][j] == 2 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                ) {
                    State.map[i][j] = 3;
                    State.score++;
                }
            }
        }
    }

    moveBackWards(): void {
        switch (this.direction) {
            case DIRECTIONS.RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTIONS.LEFT:
                this.x += this.speed;
                break;
            case DIRECTIONS.UP:
                this.y += this.speed;
                break;
            case DIRECTIONS.BOTTOM:
                this.y -= this.speed;
                break;
        }
    }

    moveForwards(): void {
        switch (this.direction) {
            case DIRECTIONS.RIGHT:
                this.x += this.speed;
                break;
            case DIRECTIONS.LEFT:
                this.x -= this.speed;
                break;
            case DIRECTIONS.UP:
                this.y -= this.speed;
                break;
            case DIRECTIONS.BOTTOM:
                this.y += this.speed;
                break;
        }
    }

    checkCollision(): boolean {
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

    checkGhostCollision(ghosts: Ghost[]): boolean {
        for (let i = 0; i < ghosts.length; i++) {
            const ghost = ghosts[i];
            if (
                ghost.getMapX() == this.getMapX() &&
                ghost.getMapY() == this.getMapY()
            ) {
                return true;
            }
        }
        return false;
    }

    changeDirectionIfPossible(): void {
        if (this.direction === this.nextDirection) return;
        const tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackWards();
            this.direction = tempDirection;
        } else {
            this.moveBackWards();
        }
    }

    changeAnimation(): void {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }

    draw(): void {
        this.ctx.save();
        this.ctx.translate(
            this.x + State.rectSize / 2,
            this.y + State.rectSize / 2
        );
        this.ctx.rotate((this.direction * 90 * Math.PI) / 180);
        this.ctx.translate(
            -this.x - State.rectSize / 2,
            -this.y - State.rectSize / 2
        );
        this.ctx.drawImage(this.images,
            (this.currentFrame - 1) * State.rectSize,
            0,
            State.rectSize,
            State.rectSize,
            this.x,
            this.y,
            this.width,
            this.height
            )
        this.ctx.restore();
    }

    getMapX(): number {
        return Math.floor(this.x / State.rectSize);
    }

    getMapY(): number {
        return Math.floor(this.y / State.rectSize);
    }

    getMapXRightSide() {
        return Math.floor((this.x * 0.99 + State.rectSize) / State.rectSize);
    }

    getMapYRightSide() {
        return Math.floor((this.y * 0.99 + State.rectSize) / State.rectSize);
    }
}