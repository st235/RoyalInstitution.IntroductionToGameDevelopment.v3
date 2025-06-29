import Phaser from "phaser";

import GameMap from "./GameMap";

function GenerateGridCoordinates(
        map: GameMap,
        snakeBodyPoints: { [Key: number]: { [Key: number]: number } } | undefined): number[] {
    const availableCoordinates = [];

    for (let i = 0; i < map.getRows(); i++) {
        for (let j = 0; j < map.getColumns(); j++) {
            const isUnnocupiedStatically = map.getType(i, j) == 'unoccupied';
            const hasSnakeSegment = (snakeBodyPoints && snakeBodyPoints[i] && snakeBodyPoints[i][j]);

            if (isUnnocupiedStatically && !hasSnakeSegment) {
                availableCoordinates.push([i, j]);
            }
        }
    }

    return Phaser.Math.RND.pick(availableCoordinates);
}

export { GenerateGridCoordinates };
