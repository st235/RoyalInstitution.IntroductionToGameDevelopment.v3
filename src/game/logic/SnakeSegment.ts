import Phaser from "phaser";

const _SEGMENT_COLOUR = 0x2e2e2e;
const _SEGMENT_PADDING_PX = 2;

class SnakeSegment extends Phaser.GameObjects.Container {

    readonly i: number;
    readonly j: number;
    private readonly _width: number;
    private readonly _height: number;

    private _withFruit: boolean;

    constructor(scene: Phaser.Scene, 
                i: number, j: number,
                width: number, height: number,
                withFruit?: boolean) {
        super(scene,
            /* x= */ j * width + width / 2,
            /* y= */ i * height + height / 2);

        this.i = i;
        this.j = j;
        this._width = width;
        this._height = height;

        this._withFruit = withFruit ?? false;
        this._createSegment();
    }

    setWithFruit(withFruit: boolean) {
        if (this._withFruit === withFruit) {
            return;
        }

        this._withFruit = withFruit;
        if (this.first) {
            this.remove(this.first);
        }

        this._createSegment();
    }

    private _createSegment() {
        if (this.first) {
            return;
        }

        if (this._withFruit) {
            this.add(this._createFoodSegment());
        } else {
            this.add(this._createRegularSegment());
        }
    }

    private _createRegularSegment(): Phaser.GameObjects.GameObject {
        return new Phaser.GameObjects.Rectangle(this.scene,
            0, 0,
            this._width - 2 * _SEGMENT_PADDING_PX,
            this._height - 2 * _SEGMENT_PADDING_PX,
            _SEGMENT_COLOUR,
        )
        .setDepth(1);
    }

    private _createFoodSegment(): Phaser.GameObjects.GameObject {
        return new Phaser.GameObjects.Rectangle(this.scene,
            0, 0,
            this._width - 2 * _SEGMENT_PADDING_PX,
            this._height - 2 * _SEGMENT_PADDING_PX,
            0xEFD631,
        )
        .setDepth(10);
    }
}

export default SnakeSegment;
