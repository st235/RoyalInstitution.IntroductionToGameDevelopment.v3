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

        this._addSegment(initialI, initialJ, false);
    }

    private _addSegment(i: number, j: number, withFruit?: boolean) {
        const newSegment = new SnakeSegment(this.scene, i, j,
            this._segmentWidth, this._segmentHeight, withFruit);
        this.add(newSegment, true);
    }

    getHeadPosition(): [number, number] {
        const headSegment = this.getLast(/* active= */ true);
        return [headSegment.i, headSegment.j];
    }

    willCollideAtPosition(position: [number, number]): boolean {
        const [i, j] = position;
        const [newHeadI, newHeadJ] = this._getNextSegmentCoordinates();
        return (newHeadI === i && newHeadJ === j);
    }

    willCollideWithMap(occupiedCells: Array<Array<boolean>>): boolean {
        const [newHeadI, newHeadJ] = this._getNextSegmentCoordinates();
        return occupiedCells[newHeadI][newHeadJ];
    }

    dumpSegments(occupiedCells: Array<Array<boolean>>,
        includeTail?: boolean) {
        const tailSegment = this.getFirst(/* active= */ true);

        for (const entry of this.children.entries) {
            const child = entry as SnakeSegment;
            const [i, j] = [child.i, child.j];

            if (!includeTail &&
                i == tailSegment.i &&
                j == tailSegment.j) {
                continue;
            }

            occupiedCells[i][j] = true;
        }
    }

    grow() {
        const tailSegment = this.getFirst(/* active= */ true);
        // _getNextSegmentCoordinates should be called before removing tail,
        // as if the snake is of length 1, there would be no children in the set.
        const [newHeadI, newHeadJ] = this._getNextSegmentCoordinates();
        this.remove(tailSegment, true, true);

        const newChildren = [];

        // Copy existing segments.
        this.children.iterate(rawChild => {
            const child = rawChild as SnakeSegment;
            newChildren.push([child.i, child.j, false]);
            return true;
        });

        // Compensating for the removed tail segment.
        newChildren.push([newHeadI, newHeadJ, false]);

        // Grow the snake by one segment, and add it to the
        // back of the segments list.
        newChildren.push([newHeadI, newHeadJ, true]);

        // Remove all children and stop drawing them.
        this.clear(true, true);

        for (const segment of newChildren) {
            const [i, j, withFruit] = segment;
            this._addSegment(i, j, withFruit);
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
