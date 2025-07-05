type MovementDirection = "left" | "right" | "down" | "up";

abstract class SnakeMovementController {
    abstract onUpdate(dt: number): void;
    abstract getMovementDirection(snake: [number, number],
        food: [number, number]): MovementDirection | undefined;
    abstract onStop(): void;
};

export default SnakeMovementController;
export type { MovementDirection };