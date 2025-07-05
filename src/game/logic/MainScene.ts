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

        const initialSnakePosition = this._map.getInitialSnakePosition();
        const initialFoodItemPosition = this._map.getInitialFoodItemPosition();

        const occupiedCellsMap = this._map.getOccupied();

        const [snakeI, snakeJ] = initialSnakePosition ?? GenerateGridCoordinates(occupiedCellsMap);

        this._snake = new Snake(this,
            snakeI, snakeJ,
            segmentWidth, segmentHeight,
            this._map.getRows(), this._map.getColumns());
        // Dumping a dynamic object into the map.
        this._snake.dumpSegments(occupiedCellsMap, /* includeTail= */ true);

        this._foodItem = new FoodItem(this, segmentWidth, segmentHeight);
        if (initialFoodItemPosition) {
            this._foodItem.placeAt(initialFoodItemPosition);
        } else {
            this._foodItem.placeAtAvailableCell(occupiedCellsMap);
        }

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
        const scoreText = this._scoreText!;

        this._movementController?.onUpdate(dt);

        if (this._metaLoopAdancer.shouldAdvance(time)) {
            const snakePosition: [number, number] = snake.getHeadPosition();
            const foodPosition: [number, number] = [foodItem.i!, foodItem.j!];

            const occupiedCellsMap = this._map.getOccupied();
            // Dump without a tail as we consider this map for the upcoming meta frame.
            snake.dumpSegments(occupiedCellsMap);

            const movementDirection = this._movementController?.getMovementDirection(
                snakePosition, foodPosition, occupiedCellsMap);

            if (movementDirection === "right") {
                snake.faceRight();
            } else if (movementDirection === "up") {
                snake.faceUp();
            } else if (movementDirection === "left") {
                snake.faceLeft();
            } else if (movementDirection === "down") {
                snake.faceDown();
            }

            // Checking collisions with static obstacles,
            // and a snake without a tail (as tail won't exist next frame).
            if (snake.willCollideWithMap(occupiedCellsMap)) {
                this._onStop();
                return;
            }

            // Check collisions with food item.
            if (snake.willCollideAtPosition(foodItem.requirePosition())) {
                snake.grow();

                // Dumping position of a food item as occupied,
                // as the snake will occupy it after movement.
                foodItem.dumpPosition(occupiedCellsMap);
                foodItem.placeAtAvailableCell(occupiedCellsMap);

                this._currentScore += foodItem.score;
                scoreText.setText("Score: " + this._currentScore);

                this._onFoodItemConsumed?.(this._currentScore);
            }

            // Movement.
            snake.move();
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
