import type { MovementDirection } from "./SnakeMovementController";
import SnakeMovementController from "./SnakeMovementController";

import { LoadQuadrupleFunction } from "../../../utils/EvalUtil";

type Point = [number, number];
type CellsMap = Array<Array<boolean>>;
// Left, Top, Right, Bottom.
type CellNeighbourhood = [boolean, boolean, boolean, boolean];

type MovementFunction = (
    snakePosition: Point,
    foodPosition: Point,
    neighbourhood: CellNeighbourhood,
    lastKnownDirection: MovementDirection
) => MovementDirection;

class ProgrammableMovementController extends SnakeMovementController {

    private readonly _movementFunction: MovementFunction;
    private _lastKnownDirection: MovementDirection;

    constructor(movementFunction: MovementFunction) {
        super();
        this._movementFunction = movementFunction;
        this._lastKnownDirection = "right";
    }

    onUpdate(_: number) {
        // Empty on purpose.
    }

    getMovementDirection(
        snake: Point,
        food: Point,
        occupiedCellsMap: CellsMap,
    ): MovementDirection | undefined {
        const neighbourhood: CellNeighbourhood = [false, false, false, false];

        // Left.
        if (ProgrammableMovementController._isOccupied([snake[0], snake[1] - 1], occupiedCellsMap)) {
            neighbourhood[0] = true;
        }

        // Top.
        if (ProgrammableMovementController._isOccupied([snake[0] - 1, snake[1]], occupiedCellsMap)) {
            neighbourhood[1] = true;
        }

        // Right.
        if (ProgrammableMovementController._isOccupied([snake[0], snake[1] + 1], occupiedCellsMap)) {
            neighbourhood[2] = true;
        }

        // Bottom.
        if (ProgrammableMovementController._isOccupied([snake[0] + 1, snake[1]], occupiedCellsMap)) {
            neighbourhood[3] = true;
        }

        this._lastKnownDirection = this._movementFunction(snake, food, neighbourhood, this._lastKnownDirection);
        return this._lastKnownDirection;
    }

    onStop(): void {
    }

    private static _isOccupied(at: Point, occupiedCellsMap: CellsMap): boolean {
        const [rawRow, rawColumn] = at;

        const row = (rawRow + occupiedCellsMap.length) % occupiedCellsMap.length;
        const column = (rawColumn + occupiedCellsMap[row].length) % occupiedCellsMap[row].length;

        return occupiedCellsMap[row][column];
    }

    static create(rawMovementFunctionCode: string): ProgrammableMovementController | undefined {
        const movementFunction = LoadQuadrupleFunction<Point, Point, CellNeighbourhood, MovementDirection, MovementDirection>(rawMovementFunctionCode);
        if (!movementFunction) {
            return undefined;
        }
        return new ProgrammableMovementController(movementFunction);
    }
};

export default ProgrammableMovementController;
