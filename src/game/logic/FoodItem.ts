import Phaser from "phaser";

import { GenerateGridCoordinates } from "./PlacementUtil";

const _FOOD_COLOUR = 0xEFD631;
const _DEFAULT_CONSUMPTION_SCORE = 10;

class FoodItem extends Phaser.GameObjects.Star {
    width: number;
    height: number;
    score: number;

    i?: number;
    j?: number;

    constructor(scene: Phaser.Scene,
                width: number, height: number,
                score: number = _DEFAULT_CONSUMPTION_SCORE) {
        super(scene, 
            /* x= */ 0, /* y= */ 0,
            /* points= */ 5, 
            /* innerRadius= */ Math.min(width, height) / 4,
            /* outerRadius= */ Math.max(width, height) / 2, 
            /* fillColor= */ _FOOD_COLOUR);

        this.width = width;
        this.height = height;
        this.score = score;
    }

    requirePosition(): [number, number] {
        return [this.i!, this.j!];
    }

    dumpPosition(occupiedCells: Array<Array<boolean>>) {
        const [i, j] = this.requirePosition();
        occupiedCells[i][j] = true;
    }

    placeAtAvailableCell(occupiedCells: Array<Array<boolean>>) {
        const newFoodItemPosition = GenerateGridCoordinates(occupiedCells);
        this.placeAt(newFoodItemPosition);
    }

    placeAt(position: [number, number]) {
        const [ni, nj] = position;
        this.i = ni;
        this.j = nj;
        this.x = nj * this.width + this.width / 2;
        this.y = ni * this.height + this.height / 2;
    }
}

export default FoodItem;
