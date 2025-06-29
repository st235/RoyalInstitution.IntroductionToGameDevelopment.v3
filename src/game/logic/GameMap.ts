type CellType = "unoccupied" | "obstacle";
type CellTexture<T> = Array<Array<T>>;

class GameMap {
    readonly _rows: number;
    readonly _columns: number;
    readonly _cellTypes: Array<CellType>;

    constructor(rows: number,
                columns: number,
                obstaclesTexture: CellTexture<boolean>) {
        this._rows = rows;
        this._columns = columns;

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

    getType(i: number, j: number): CellType {
        return this._cellTypes[i * this._columns + j];
    }

    iterate(callback: (item: CellType, ri: number, cj: number) => void) {
        for (let i = 0; i < this._rows; i++) {
            for (let j = 0; j < this._columns; j++) {
                callback(this._cellTypes[i * this._columns + j], i, j);
            }
        }
    }

    static fromConfigFile(value: string): GameMap {
        const lines = value.split(/(\s+)/);

        if (lines.length < 1) {
            throw new Error("Config is empty.");
        }

        const [rows, columns] = lines[0].split(",").map(parseInt);

        if (lines.length == 1) {
            return new GameMap(rows, columns, []);
        }

        // Empty and obstacle symbols.
        const [_, obstacle] = lines[1].split(",");

        const obstaclesMap = new Array<Array<boolean>>();
        for (let ri = 2; ri < lines.length; ri++) {
            obstaclesMap.push(lines[ri].split('').map(c => c === obstacle));
        }

        return new GameMap(rows, columns, obstaclesMap);
    }
}

export default GameMap;
export type { CellType, CellTexture };
