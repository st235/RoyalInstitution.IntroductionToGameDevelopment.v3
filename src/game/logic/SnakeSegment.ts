import Phaser from "phaser";

const _SEGMENT_COLOUR = 0x2e2e2e;

class SnakeSegment extends Phaser.GameObjects.Rectangle {
    i: number;
    j: number;

    constructor(scene: Phaser.Scene, 
                i: number, j: number,
                width: number, height: number) {
        super(scene,
            /* x= */ j * width + width / 2,
            /* y= */ i * height + height / 2,
            width, height,
            /* color= */ _SEGMENT_COLOUR);

        this.i = i;
        this.j = j;
    }
}

export default SnakeSegment;
