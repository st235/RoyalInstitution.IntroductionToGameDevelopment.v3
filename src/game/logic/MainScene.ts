import Phaser from "phaser";

import type { GameConfig } from "../GameConfig";

import { GenerateGridCoordinates } from "./PlacementUtil";
import CountDownTimer from "./CountDownTimer";
import DefaultMetaLoopAdancer from "./loop/DefaultMetaLoopAdvancer";
import FoodItem from "./FoodItem";
import GameMap from "./GameMap";
import KeyboardDrivenMovementController from "./movement-controller/KeyboardDrivenMovementController";
import MetaLoopAdvancer from "./loop/MetaLoopAdvancer";
import ObstaclesGroup from "./ObstaclesGroup";
import Snake from "./Snake";
import SnakeMovementController from "./movement-controller/SnakeMovementController";

const _MAIN_SCENE_STARTING_MS = 3_000;

type MainSceneState = "idling" | "starting" | "running" | "finished";

class MainScene extends Phaser.Scene {
    private _map: GameMap;
    private _metaLoopAdancer: MetaLoopAdvancer;
    private _movementController?: SnakeMovementController;
    private _onFoodItemConsumed?: (score: number) => void;
    private _onGameFinished?: (finalScore: number) => void;

    _state: MainSceneState;
    _currentScore: number;

    // Game properties.
    _snake?: Snake;
    _foodItem?: FoodItem;
    _obstacles?: ObstaclesGroup;
    _scoreText?: Phaser.GameObjects.Text;

    // Countdown.
    _countdownTimer: CountDownTimer;
    _countdownText?: Phaser.GameObjects.Text;

    // Game over.
    _gameOverText?: Phaser.GameObjects.Text;

    constructor() {
        super();
        this._map = new GameMap(0, 0, []);
        this._metaLoopAdancer = DefaultMetaLoopAdancer.create();

        this._countdownTimer = new CountDownTimer();
        this._state = "idling";
        this._currentScore = 0;
    }

    init(data: GameConfig) {
        this._map = data.map;
        if (data.metaLoopAdvancer) {
            this._metaLoopAdancer = data.metaLoopAdvancer;
        }
        if (data.movementController) {
            this._movementController = data.movementController;
        } else {
            this._movementController = KeyboardDrivenMovementController.create(this);
        }
        this._onFoodItemConsumed = data.onFoodItemConsumed;
        this._onGameFinished = data.onGameFinished;

        this._state = "idling";
        this._currentScore = 0;
    }

    preload() {
        this._state = "starting";
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

        const [snakeI, snakeJ] = this._map.getInitialSnakePosition() ??
            GenerateGridCoordinates(this._map, undefined);
        this._snake = new Snake(this,
            snakeI, snakeJ,
            segmentWidth, segmentHeight,
            this._map.getRows(), this._map.getColumns());

        this._foodItem = new FoodItem(this, segmentWidth, segmentHeight);
        this._foodItem.place(this._map, this._snake.getSegmentsCoordinates(),
            this._map.getInitialFoodPosition());

        this._obstacles = new ObstaclesGroup(this, segmentWidth, segmentHeight, this._map);

        this._scoreText = this.add.text(viewportWidth - 220, 20, "Score: 0")
            .setFontSize(32)
            .setDepth(10);

        this._countdownText = this.add.text(viewportWidth / 2, viewportHeight / 2, _MAIN_SCENE_STARTING_MS.toString())
            .setFontSize(64)
            .setOrigin(0.5, 0.5)
            .setDepth(10);

        this._gameOverText = this.add.text(viewportWidth / 2, viewportHeight / 2, "Game over")
            .setFontSize(36)
            .setVisible(false)
            .setOrigin(0.5, 0.5)
            .setDepth(10);

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

        const snake = this._snake!;
        const foodItem = this._foodItem!;
        const obstacles = this._obstacles!;
        const scoreText = this._scoreText!;

        this._movementController?.onUpdate(dt);

        if (this._metaLoopAdancer.shouldAdvance(time)) {
            const movementDirection = this._movementController?.getMovementDirection();
            if (movementDirection === "right") {
                snake.faceRight();
            } else if (movementDirection === "up") {
                snake.faceUp();
            } else if (movementDirection === "left") {
                snake.faceLeft();
            } else if (movementDirection === "down") {
                snake.faceDown();
            }

            // Pre movement checks.
            if (obstacles.willCollideAfterMovement(snake)) {
                this._onStop();
                return;
            }

            // Movement.
            snake.move();

            // Post movement checks.
            const segmentOccupiedCoordinates = snake.getSegmentsCoordinates();

            for (const row in segmentOccupiedCoordinates) {
                for (const column in segmentOccupiedCoordinates[row]) {
                    if (segmentOccupiedCoordinates[row][column] > 1) {
                        this._onStop();
                        return;
                    }
                }
            }

            if (snake.checkPostMovementCollisionWith(foodItem.i!, foodItem.j!)) {
                snake.grow();

                foodItem.place(this._map, segmentOccupiedCoordinates);
                this._currentScore += foodItem.score;
                scoreText.setText("Score: " + this._currentScore);

                this._onFoodItemConsumed?.(this._currentScore);
            }
        }
    }

    private _onStop() {
        this._movementController?.onStop();

        this._state = "finished";
        this._gameOverText?.setVisible(true);
        this._onGameFinished?.(this._currentScore);
    }
};

export default MainScene;
