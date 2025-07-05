type MovementDirection = "left" | "right" | "down" | "up";

abstract class SnakeMovementController {
    abstract onUpdate(dt: number): void;
    abstract getMovementDirection(
        snake: [number, number],
        food: [number, number],
        occupiedCellsMap: Array<Array<boolean>>,
    ): MovementDirection | undefined;
    abstract onStop(): void;
};

export default SnakeMovementController;
export type { MovementDirection };