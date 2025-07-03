import Phaser from "phaser";

import { GenerateGridCoordinates } from "./PlacementUtil";
import CountDownTimer from "./CountDownTimer";
import FoodItem from "./FoodItem";
import GameMap from "./GameMap";
import ObstaclesGroup from "./ObstaclesGroup";
import Snake from "./Snake";

const _MAIN_SCENE_STARTING_MS = 3_000;
const _SNAKE_MOVE_TIME_MS = 100;

type MainSceneState = "idling" | "starting" | "running" | "finished";

type MainSceneConfig = {
    map: GameMap;
};

class MainScene extends Phaser.Scene {
    _map: GameMap;

    _state: MainSceneState;
    _lastUpdateTime: number;
    _currentScore: number;

    _cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    // Game properties.
    _snake?: Snake;
    _foodItem?: FoodItem;
    _obstacles?: ObstaclesGroup;
    _scoreText?: Phaser.GameObjects.Text;

    // Countdown.
    _countdownTimer: CountDownTimer;
    _countdownText?: Phaser.GameObjects.Text;

    constructor() {
        super();
        this._map = new GameMap(0, 0, []);
        this._countdownTimer = new CountDownTimer();
        this._state = "idling";
        this._lastUpdateTime = 0;
        this._currentScore = 0;
    }

    init(data: MainSceneConfig) {
        this._map = data.map;

        this._state = "idling";
        this._lastUpdateTime = 0;
        this._currentScore = 0;
    }

    preload() {
        this._state = "starting";
        this._cursors = this.input.keyboard?.createCursorKeys();
        this._lastUpdateTime = 0;
        this._currentScore = 0;

        // Start countdown.
        this._countdownTimer.setOnTickListener((remainingTimeMs) => {
            const countdownText = this._countdownText;
            if (countdownText) {
                const remainingSeconds = Math.ceil(remainingTimeMs / 1_000);
                countdownText.setText(remainingSeconds.toString());
            }
        });

        this._countdownTimer.start(_MAIN_SCENE_STARTING_MS, 1_000, () => {
            this._state = "running";
            const countdownText = this._countdownText;
            if (countdownText) {
                countdownText.setVisible(false);
            }
        });
    }

    create() {
        const viewportWidth = Number(this.game.config.width);
        const viewportHeight = Number(this.game.config.height);

        const segmentWidth = viewportWidth / this._map.getColumns();
        const segmentHeight = viewportHeight / this._map.getRows();

        const [ snakeI, snakeJ ] = GenerateGridCoordinates(this._map, undefined);
        this._snake = new Snake(this,
            snakeI, snakeJ,
            segmentWidth, segmentHeight,
            this._map.getRows(), this._map.getColumns());

        this._foodItem = new FoodItem(this, segmentWidth, segmentHeight);
        this._foodItem.place(this._map, this._snake.bodyCoordinates());

        this._obstacles = new ObstaclesGroup(this, segmentWidth, segmentHeight, this._map);

        this._scoreText = this.add.text(viewportWidth - 220, 20, "Score: 0")
            .setFontSize(32)
            .setDepth(10);

        this._countdownText = this.add.text(viewportWidth / 2, viewportHeight / 2, _MAIN_SCENE_STARTING_MS.toString())
            .setFontSize(64);

        this.add.existing(this._snake);
        this.add.existing(this._foodItem);
    }

    update(time: number, dt: number) {
        if (this._state !== "starting"
            && this._state !== "running") {
            return;
        }

        if (this._state === "starting") {
            this._countdownTimer.update(dt);
            return;
        }

        const cursors = this._cursors!;

        const snake = this._snake!;
        const foodItem = this._foodItem!;
        const obstacles = this._obstacles!;
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
                foodItem.place(this._map, snakeOccupiedPoints);
                this._currentScore += foodItem.score;
                
                scoreText.setText("Score: " + this._currentScore);
            }

            for (const row in snakeOccupiedPoints) {
                for (const column in snakeOccupiedPoints[row]) {
                    if (snakeOccupiedPoints[row][column] > 1) {
                        this._state = "finished";
                    }
                }
            }

            if (obstacles.doesCollide(snake)) {
                this._state = "finished";
            }
        }
    }
};

export default MainScene;
