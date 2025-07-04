import type { MovementDirection } from "./SnakeMovementController";
import SnakeMovementController from "./SnakeMovementController";

class MovementDirectionListController extends SnakeMovementController {

    private readonly _directions: MovementDirection[];
    private _directionIndex: number;

    constructor(directions: MovementDirection[]) {
        super();
        this._directions = directions;
        this._directionIndex = 0;
    }

    onUpdate(_: number) {
        // Empty on purpose.
    }

    getMovementDirection(): MovementDirection | undefined {
        const direction = this._directions[this._directionIndex];
        this._directionIndex += 1;
        return direction;
    }

    onStop(): void {
        this._directionIndex = 0;
    }

    static create(directions: MovementDirection[]): MovementDirectionListController | undefined {
        for (const direction of directions) {
            if (direction !== "left" &&
                direction !== "right" &&
                direction !== "down" &&
                direction !== "up") {
                    return undefined;
                }
        }
        return new MovementDirectionListController(directions);
    }
};

export default MovementDirectionListController;
