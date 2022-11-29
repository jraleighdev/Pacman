import { Ghost } from "./ghost";

class PacMan {

    private nextDirection = DIRECTIONS.RIGHT;
    private frameCount = 7;
    private currentFrame = 1;

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public speed: number,
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
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[0].length; j++) {
                if (
                    map[i][j] == 2 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                ) {
                    map[i][j] == 3;
                    score++;
                }
            }
        }
    }

    moveBackWards(): void {
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

    moveForwards(): void {
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

    checkCollision(): boolean {
        let isCollided = false;
        if (
            map[Math.floor(this.y / rectSize)][
                Math.floor(this.x / rectSize)
            ] == 1 ||
            map[Math.floor(this.y / rectSize + 0.9999)][
                Math.floor(this.x / rectSize)
            ] == 1 ||
            map[Math.floor(this.y / rectSize)][
                Math.floor(this.x / rectSize + 0.9999)
            ] == 1 ||
            map[Math.floor(this.y / rectSize + 0.9999)][
                Math.floor(this.x / rectSize + 0.9999)
            ] == 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    checkGhostCollision(ghosts: Ghost[]): void {

    }

    changeDirectionIfPossible(): void {
        if (this.direction === this.nextDirection) return;
        const tempDirection = this.direction;
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackWards();
            this.direction = tempDirection;
        } else {
            this.moveBackWards();
        }
    }

    changeAnimation(): void {

    }

    draw(): void {
        ctx.save();
        ctx.translate(
            -this.x - rectSize / 2,
            -this.y - rectSize / 2
        );
        ctx.rotate((this.direction * 90 * Math.PI) / 180);
        ctx.translate(
            -this.x - rectSize / 2,
            -this.y - rectSize / 2
        );
        ctx.drawImage(pacManFrames,
            (this.currentFrame - 1) * rectSize,
            0,
            rectSize,
            rectSize,
            this.x,
            this.y,
            this.width,
            this.height
            )
    }

    getMapX(): number {
        return Math.floor(this.x / rectSize);
    }

    getMapY(): number {
        return Math.floor(this.y / rectSize);
    }

    getMapXRightSide() {
        return Math.floor((this.x + .9999 * rectSize) / rectSize);
    }

    getMapYRightSide() {
        return Math.floor((this.y + .9999 * rectSize) / rectSize);
    }
}