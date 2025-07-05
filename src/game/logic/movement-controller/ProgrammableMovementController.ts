import type { MovementDirection } from "./SnakeMovementController";
import SnakeMovementController from "./SnakeMovementController";

import { LoadTupleFunction } from "../../../utils/EvalUtil";

type MovementFunction = (snakePosition: [number, number], foodPosition: [number, number]) => MovementDirection;

class ProgrammableMovementController extends SnakeMovementController {

    private readonly _movementFunction: MovementFunction;

    constructor(movementFunction: MovementFunction) {
        super();
        this._movementFunction = movementFunction;
    }

    onUpdate(_: number) {
        // Empty on purpose.
    }

    getMovementDirection(snake: [number, number], food: [number, number]): MovementDirection | undefined {
        return this._movementFunction(snake, food);
    }

    onStop(): void {
    }

    static create(rawMovementFunctionCode: string): ProgrammableMovementController | undefined {
        const movementFunction = LoadTupleFunction<[number, number], [number, number], MovementDirection>(rawMovementFunctionCode);
        if (!movementFunction) {
            return undefined;
        }
        return new ProgrammableMovementController(movementFunction);
    }
};

export default ProgrammableMovementController;
