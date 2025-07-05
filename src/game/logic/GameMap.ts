type CellType = "unoccupied" | "obstacle";
type CellTexture<T> = Array<Array<T>>;

class GameMap {
    private readonly _rows: number;
    private readonly _columns: number;
    private readonly _initialSnakePosition?: [number, number];
    private readonly _initialFoodPosition?: [number, number];
    private readonly _cellTypes: Array<CellType>;

    constructor(rows: number,
                columns: number,
                obstaclesTexture: CellTexture<boolean>,
                initialSnakePosition?: [number, number],
                initialFoodPosition?: [number, number],) {
        this._rows = rows;
        this._columns = columns;
        this._initialSnakePosition = initialSnakePosition;
        this._initialFoodPosition = initialFoodPosition;

        this._cellTypes = Array<CellType>(this._rows * this._columns);
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                const index = i * this._columns + j;

                if (i < obstaclesTexture.length &&
                    j < obstaclesTexture[i].length &&
                    obstaclesTexture[i][j]) {
                    this._cellTypes[index] = "obstacle";
                } else {
                    this._cellTypes[index] = "unoccupied";
                }
            }
        }
    }

    getRows(): number {
        return this._rows;
    }

    getColumns(): number {
        return this._columns;
    }

    getFieldDimensions(): [number, number] {
        return [this._rows, this._columns];
    }

    getInitialSnakePosition(): [number, number] | undefined {
        return this._initialSnakePosition;
    }

    getInitialFoodItemPosition(): [number, number] | undefined {
        return this._initialFoodPosition;
    }

    getType(i: number, j: number): CellType {
        return this._cellTypes[i * this._columns + j];
    }

    getOccupied(): Array<Array<boolean>> {
        const map = Array.from({length: this._rows}, () =>
            Array.from({length: this._columns}, () => false));

        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                const cellType = this._cellTypes[i * this._columns + j];

                if (cellType != "unoccupied") {
                    map[i][j] = true;
                }
            }
        }

        return map;
    }

    iterate(callback: (item: CellType, ri: number, cj: number) => void) {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                callback(this._cellTypes[i * this._columns + j], i, j);
            }
        }
    }

    static fromConfigFile(value: string): GameMap {
        const lines = value.trim().split("\n").filter(l => l.length > 0);

        if (lines.length < 1) {
            throw new Error("Config is empty.");
        }

        const [rows, columns] = lines[0].split(",").map((value) => parseInt(value));
        if (lines.length == 1) {
            return new GameMap(rows, columns, []);
        }

        // Empty and obstacle symbols.
        const [_, obstacle, snake, food] = lines[1].split(",");

        let initialSnakePosition: [number, number] | undefined = undefined;
        let initialFoodPosition: [number, number] | undefined = undefined;

        const obstaclesMap = new Array<Array<boolean>>();
        for (let ri = 2; ri < lines.length; ri++) {
            const row = lines[ri].split('');
            obstaclesMap.push(row.map(c => c === obstacle));

            const snakeJ = row.findIndex(c => c === snake);
            if (snakeJ != -1) {
                initialSnakePosition = [ri - 2, snakeJ];
            }

            const foodJ = row.findIndex(c => c === food);
            if (foodJ != -1) {
                initialFoodPosition = [ri - 2, foodJ];
            }
        }

        return new GameMap(rows, columns, obstaclesMap, initialSnakePosition, initialFoodPosition);
    }
}

export default GameMap;
export type { CellType, CellTexture };
