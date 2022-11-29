class PacMan {

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public speed: number,
        public direction: DIRECTIONS = DIRECTIONS.RIGHT
    ) { }

    moveProcess(): void {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackWards();
        }
    }

    eat(): void {
        
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
        if (map[this.getMapy()][this.getMapX()] === 1 || map[this.getMapYRightSide()][this.getMapX()] === 1) {
            
        }
    }

    checkGhostCollision(): void {

    }

    changeDirectionIfPossible(): void {

    }

    changeAnimation(): void {

    }

    draw(): void {
        
    }

    getMapX(): number {
        return parseInt((this.x / rectSize).toString());
    }

    getMapy(): number {
        return parseInt((this.y / rectSize).toString())
    }

    getMapXRightSide() {
        return parseInt(((this.x + .9999 * rectSize) / rectSize).toString())
    }

    getMapYRightSide() {
        return parseInt(((this.y + .9999 * rectSize) / rectSize).toString())
    }
}