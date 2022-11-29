import { Target } from "~/interfaces/targets";

export class State {
    public static score = 0;
    public static lives = 3;
    public static readonly fps = 30;
    public static readonly ghostCount = 4;
    public static readonly rectSize = 20;
    public static readonly wallColor = '#342DCA';
    public static readonly wallSpaceWidth = this.rectSize / 1.5;
    public static readonly wallOffset = (this.rectSize - this.wallSpaceWidth) / 2;
    public static readonly wallInnerColor = 'black';
    public static readonly ghostImageLocations: Target[] = [
        { x: 0, y: 0 },
        { x: 176, y: 0 },
        { x: 0, y: 121 },
        { x: 176, y: 121 },
    ];
    public static readonly map: number[][] = [
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
      public static readonly randomTargetsForGhosts: Target[] = [
        { x: 1 * this.rectSize, y: 1 * this.rectSize },
        { x: 1 * this.rectSize, y: (this.map.length - 2) * this.rectSize },
        { x: (this.map[0].length - 2) * this.rectSize, y: this.rectSize },
        {
            x: (this.map[0].length - 2) * this.rectSize,
            y: (this.map.length - 2) * this.rectSize,
        },
    ];
}