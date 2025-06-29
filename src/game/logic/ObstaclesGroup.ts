import Phaser from "phaser";

import GameMap from "./GameMap";
import Obstacle from "./Obstacle";
import Snake from "./Snake";

class ObstaclesGroup extends Phaser.GameObjects.Group {
    readonly _segmentWidth: number;
    readonly _segmentHeight: number;
    readonly _gameMap: GameMap;

    constructor(scene: Phaser.Scene,
                segmentWidth: number, segmentHeight: number,
                gameMap: GameMap) {
        super(scene);

        this._segmentWidth = segmentWidth;
        this._segmentHeight = segmentHeight;

        this._gameMap = gameMap;

        this._gameMap.iterate((type, i, j) => {
            if (type === "obstacle") {
                this._addObstacle(i, j);
            }
        });
    }

    _addObstacle(i: number, j: number) {
        const newSegment = new Obstacle(
            this.scene, i, j, this._segmentWidth, this._segmentHeight);
        this.add(newSegment, true);
    }

    doesCollide(snake: Snake): boolean {
        for (const rawChild of this.children.entries) {
            const child = rawChild as Obstacle;
            if (snake.checkCollisionWith(child.i, child.j)) {
                return true;
            }
        };

        return false;
    }
}

export default ObstaclesGroup;
