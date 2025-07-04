import Phaser from "phaser";

import type { MovementDirection } from "./SnakeMovementController";
import SnakeMovementController from "./SnakeMovementController";

class KeyboardDrivenMovementController extends SnakeMovementController {

    private readonly _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _lastKnownMovementDirection?: MovementDirection;

    constructor(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        super();

        this._cursors = cursors;
    }


    onUpdate(_: number) {
        if (this._cursors.right.isDown) {
            this._lastKnownMovementDirection = "right";
        } else if (this._cursors.up.isDown) {
            this._lastKnownMovementDirection = "up";
        } else if (this._cursors.left.isDown) {
            this._lastKnownMovementDirection = "left";
        } else if (this._cursors.down.isDown) {
            this._lastKnownMovementDirection = "down";
        }
    }

    getMovementDirection(): MovementDirection | undefined {
        return this._lastKnownMovementDirection;
    }

    onStop(): void {
        // Empty on purpose.
    }

    static create(scene: Phaser.Scene): KeyboardDrivenMovementController | undefined {
        const cursors = scene.input.keyboard?.createCursorKeys();
        if (cursors) {
            return new KeyboardDrivenMovementController(cursors);
        }
        return undefined;
    }
};

export default KeyboardDrivenMovementController;
