type MovementDirection = "left" | "right" | "down" | "up";

abstract class SnakeMovementController {
    abstract onUpdate(dt: number): void;
    abstract getMovementDirection(): MovementDirection | undefined;
};

export default SnakeMovementController;
export type { MovementDirection };