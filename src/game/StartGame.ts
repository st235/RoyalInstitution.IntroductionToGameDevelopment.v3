import Phaser from "phaser";

import MainScene from "./logic/MainScene";

const config = {
    type: Phaser.AUTO,
    parent: "game-container",
    width: 720,
    height: 640,
    backgroundColor: '#8da259',
    scene: MainScene,
    physics: {
        default: "arcade",
    }
};

const StartGame = (parent: HTMLElement | string): Phaser.Game => {
    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
