import Phaser from "phaser";

import MainScene from "./logic/MainScene";

const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    backgroundColor: "#8da259",
    scene: MainScene,
    physics: {
        default: "arcade",
    }
};

const StartGame = (parent: HTMLElement | string,
                   width: number, height: number): Phaser.Game => {
    return new Phaser.Game({ ...config, width, height, parent });
}

export default StartGame;
