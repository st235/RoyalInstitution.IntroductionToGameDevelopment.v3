import Phaser from "phaser";

import Snake from "./Snake";
import FoodItem from "./FoodItem";

const _SNAKE_MOVE_TIME_MS = 100;

type MainSceneConfig = {
    rows: number;
    columns: number;
}

class MainScene extends Phaser.Scene {
    _desiredRows: number;
    _desiredColumns: number;

    _isRunning: boolean;
    _lastUpdateTime: number;
    _currentScore: number;

    _cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    _snake?: Snake;
    _foodItem?: FoodItem;
    _scoreText?: Phaser.GameObjects.Text;

    constructor() {
        super();
    }

    init(data: MainSceneConfig) {
        this._desiredRows = data.rows;
        this._desiredColumns = data.columns;

        this._isRunning = false;
        this._lastUpdateTime = 0;
        this._currentScore = 0;
    }

    preload() {
        this._isRunning = true;
        this._cursors = this.input.keyboard?.createCursorKeys();
        this._lastUpdateTime = 0;
        this._currentScore = 0;
    }

    create() {
        const viewportWidth = Number(this.game.config.width);
        const viewportHeight = Number(this.game.config.height);

        const segmentWidth = viewportWidth / this._desiredColumns;
        const segmentHeight = viewportHeight / this._desiredRows;

        this._snake = new Snake(this,
            Phaser.Math.Between(0, this._desiredRows),
            Phaser.Math.Between(0, this._desiredColumns),
            segmentWidth, segmentHeight,
            this._desiredRows, this._desiredColumns);

        this._foodItem = new FoodItem(this, segmentWidth, segmentHeight);
        this._foodItem.place(this._snake.bodyCoordinates(),
            this._desiredRows, this._desiredColumns);

        this._scoreText = this.add.text(viewportWidth - 220, 20, "Score: 0")
            .setFontSize(32)
            .setDepth(10);

        this.add.existing(this._snake);
        this.add.existing(this._foodItem);
    }

    update(time: number) {
        if (!this._isRunning) {
            return;
        }

        const cursors = this._cursors!;

        const snake = this._snake!;
        const foodItem = this._foodItem!;
        const scoreText = this._scoreText!;

        if (cursors.right.isDown) {
            snake.faceRight();
        } else if (cursors.up.isDown) {
            snake.faceUp();
        } else if (cursors.left.isDown) {
            snake.faceLeft();
        } else if (cursors.down.isDown) {
            snake.faceDown();
        }

        if (time - this._lastUpdateTime > _SNAKE_MOVE_TIME_MS) {
            this._lastUpdateTime = time;
            snake.move();

            const snakeOccupiedPoints = snake.bodyCoordinates();

            if (snake.checkCollisionWith(foodItem.i!, foodItem.j!)) {
                snake.grow();
                foodItem.place(snakeOccupiedPoints, this._desiredRows, this._desiredColumns);
                this._currentScore += foodItem.score;
                
                scoreText.setText("Score: " + this._currentScore);
            }

            for (const row in snakeOccupiedPoints) {
                for (const column in snakeOccupiedPoints[row]) {
                    if (snakeOccupiedPoints[row][column] > 1) {
                        this._isRunning = false;
                    }
                }
            }
        }
    }
};

export default MainScene;
