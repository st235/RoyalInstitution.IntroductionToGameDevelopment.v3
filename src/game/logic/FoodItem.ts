import Phaser from "phaser";

import { GenerateGridCoordinates } from "./PlacementUtil";
import GameMap from "./GameMap";

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

    place(map: GameMap,
          snakeBodyPoints: { [Key: number]: { [Key: number]: number } },
          atSpecificPosition?: [number, number]) {
        const newFoodItemPosition = atSpecificPosition ?? GenerateGridCoordinates(map, snakeBodyPoints);
        const [ni, nj] = newFoodItemPosition;

        this.i = ni;
        this.j = nj;
        this.x = nj * this.width + this.width / 2;
        this.y = ni * this.height + this.height / 2;
    }
}

export default FoodItem;
