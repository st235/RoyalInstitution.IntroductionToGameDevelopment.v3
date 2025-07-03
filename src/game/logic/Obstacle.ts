import Phaser from "phaser";

const _OBSTACLE_COLOUR = 0x2e2e2e;

class Obstacle extends Phaser.GameObjects.Rectangle {
    i: number;
    j: number;

    constructor(scene: Phaser.Scene, 
                i: number, j: number,
                width: number, height: number) {
        super(scene,
            /* x= */ j * width + width / 2,
            /* y= */ i * height + height / 2,
            width, height,
            /* color= */ _OBSTACLE_COLOUR,
            0.85);

        this.i = i;
        this.j = j;
    }
}

export default Obstacle;
