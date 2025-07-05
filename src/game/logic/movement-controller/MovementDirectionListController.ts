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

    getMovementDirection(_snake: [number, number], _food: [number, number]): MovementDirection | undefined {
        const direction = this._directions[this._directionIndex];
        this._directionIndex += 1;
        return direction;
    }

    onStop(): void {
        this._directionIndex = 0;
    }

    static create(rawDirections: MovementDirection[]): MovementDirectionListController | undefined {
        const directions: MovementDirection[] = [];

        for (const rawDirection of rawDirections) {
            const [direction, repeat] = rawDirection.split(" ");

            if (direction !== "left" &&
                direction !== "right" &&
                direction !== "down" &&
                direction !== "up") {
                    return undefined;
            }

            for (let i = 0; i < parseInt(repeat ?? "1"); i++) {
                directions.push(direction);
            }
        }
        return new MovementDirectionListController(directions);
    }
};

export default MovementDirectionListController;
