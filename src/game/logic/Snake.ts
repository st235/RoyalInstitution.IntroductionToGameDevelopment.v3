import Phaser from "phaser";

import SnakeSegment from "./SnakeSegment";

const _MOVE_DIRECTION_RIGHT = [0, 1];
const _MOVE_DIRECTION_UP = [-1, 0];
const _MOVE_DIRECTION_LEFT = [0, -1];
const _MOVE_DIRECTION_DOWN = [1, 0];

class Snake extends Phaser.GameObjects.Group {
    _segmentWidth: number;
    _segmentHeight: number;
    _tableRows: number;
    _tableColumns: number;
    _moveDirection: Array<number>;
    _lastKnownMoveDirection: Array<number>;

    constructor(scene: Phaser.Scene,
                initialI: number, initialJ: number,
                segmentWidth: number, segmentHeight: number,
                tableRows: number, tableColumns: number) {
        super(scene);

        this._segmentWidth = segmentWidth;
        this._segmentHeight = segmentHeight;

        this._tableRows = tableRows;
        this._tableColumns = tableColumns;

        this._moveDirection = _MOVE_DIRECTION_RIGHT;
        this._lastKnownMoveDirection = _MOVE_DIRECTION_RIGHT;

        this._addSegment(initialI, initialJ);
    }

    private _addSegment(i: number, j: number) {
        const newSegment = new SnakeSegment(this.scene, i, j,
            this._segmentWidth, this._segmentHeight);
        this.add(newSegment, true);
    }

    getHeadPosition(): [number, number] {
        const headSegment = this.getLast(/* active= */ true);
        return [headSegment.i, headSegment.j];
    }

    checkPreMovementCollisionWith(i: number, j: number): boolean {
        const [newHeadI, newHeadJ] = this._getNextSegmentCoordinates();
        return (newHeadI === i && newHeadJ === j);
    }

    checkPostMovementCollisionWith(i: number, j: number): boolean {
        const headSegment = this.getLast(/* active= */ true);
        return (headSegment.i === i && headSegment.j === j);
    }

    getSegmentsCoordinates(): { [Key: number]: { [Key: number]: number } } {
        const bodyCoordinates: { [Key: number]: { [Key: number]: number } } = {};

        this.children.iterate(rawChild => {
            const child = rawChild as SnakeSegment;
            const [i, j] = [child.i, child.j];

            if (!(i in bodyCoordinates)) {
                bodyCoordinates[i] = {};
            }
            if (!(j in bodyCoordinates[i])) {
                bodyCoordinates[i][j] = 0;
            }

            bodyCoordinates[i][j] += 1;
            return true;
        }, true);

        return bodyCoordinates;
    }

    grow() {
        const tailSegment = this.getFirst(/* active= */ true);

        const newChildren = [];
        // Grow the snake by one segment, and add it to the
        // back of the segments list.
        newChildren.push([tailSegment.i, tailSegment.j]);

        // Copy existing segments.
        this.children.iterate(rawChild => {
            const child = rawChild as SnakeSegment;
            newChildren.push([child.i, child.j]);
            return true;
        });

        // Remove all children and stop drawing them.
        this.clear(true, true);

        for (const segment of newChildren) {
            const [i, j] = segment;
            this._addSegment(i, j);
        }
    }

    move() {
        const tailSegment = this.getFirst(/* active= */ true);
        // _getNextSegmentCoordinates should be called before removing tail,
        // as if the snake is of length 1, there would be no children in the set.
        const [newHeadI, newHeadJ] = this._getNextSegmentCoordinates();

        this.remove(tailSegment, true, true);
        this._addSegment(newHeadI, newHeadJ);

        // Updating last known move direction as well.
        this._lastKnownMoveDirection = this._moveDirection;
    }

    faceRight() {
        if (this._lastKnownMoveDirection !== _MOVE_DIRECTION_LEFT) {
            this._moveDirection = _MOVE_DIRECTION_RIGHT;
        }
    }

    faceUp() {
        if (this._lastKnownMoveDirection !== _MOVE_DIRECTION_DOWN) {
            this._moveDirection = _MOVE_DIRECTION_UP;
        }
    }

    faceLeft() {
        if (this._lastKnownMoveDirection !== _MOVE_DIRECTION_RIGHT) {
            this._moveDirection = _MOVE_DIRECTION_LEFT;
        }
    }

    faceDown() {
        if (this._lastKnownMoveDirection !== _MOVE_DIRECTION_UP) {
            this._moveDirection = _MOVE_DIRECTION_DOWN;
        }
    }

    private _getNextSegmentCoordinates(): [number, number] {
        const headSegment = this.getLast(/* active= */ true);
        const [di, dj] = this._moveDirection;
        
        return [/* i= */ (headSegment.i + di + this._tableRows) % this._tableRows,
                /* j= */ (headSegment.j + dj + this._tableColumns) % this._tableColumns];
    }
}

export default Snake;
