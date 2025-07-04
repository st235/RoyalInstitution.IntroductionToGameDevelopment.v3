import GameMap from "./logic/GameMap";
import MetaLoopAdvancer from "./logic/loop/MetaLoopAdvancer";
import SnakeMovementController from "./logic/movement-controller/SnakeMovementController";

type GameConfig = {
    map: GameMap;
    metaLoopAdvancer?: MetaLoopAdvancer;
    movementController?: SnakeMovementController;
    onFoodItemConsumed?: (score: number) => void;
    onGameFinished?: (finalScore: number) => void;
};

export type { GameConfig };
