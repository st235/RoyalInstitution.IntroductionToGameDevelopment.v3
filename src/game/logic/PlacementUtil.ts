import Phaser from "phaser";

function GenerateGridCoordinates(occupiedCells: Array<Array<boolean>>): [number, number] {
    const availableCoordinates = [];

    for (let i = 0; i < occupiedCells.length; i++) {
        for (let j = 0; j < occupiedCells[i].length; j++) {
            if (!occupiedCells[i][j]) {
                availableCoordinates.push([i, j]);
            }
        }
    }

    const selectedCoordinates = Phaser.Math.RND.pick(availableCoordinates);
    return [selectedCoordinates[0], selectedCoordinates[1]];
}

export { GenerateGridCoordinates };
