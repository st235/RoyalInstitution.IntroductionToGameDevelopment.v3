type MovementDirection = "left" | "right" | "down" | "up";

abstract class SnakeMovementController {
    abstract onUpdate(dt: number): void;
    abstract getMovementDirection(): MovementDirection | undefined;
    abstract onStop(): void;
};

export default SnakeMovementController;
export type { MovementDirection };