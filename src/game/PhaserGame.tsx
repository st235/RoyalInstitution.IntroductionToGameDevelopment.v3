import "./PhaserGame.css";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import Phaser from "phaser";

import StartGame from "./StartGame";
import { EventBus } from "./EventBus";

type PhaserGameRef = {
    game: Phaser.Game,
    scene: Phaser.Scene | null,
} | null;

type PhaserGameProps = {
    ref: React.RefObject<PhaserGameRef>,
    onSceneReady?: (scene: Phaser.Scene) => void,
};

function PhaserGame(props: PhaserGameProps) {
    const ref = props.ref;

    const game = useRef<Phaser.Game>(null);

    // Create the game inside a useLayoutEffect hook to avoid the game
    // being created outside the DOM.
    useLayoutEffect(() => {
        if (!game.current) {
            game.current = StartGame("game-container");
            if (ref !== null) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        }
    }, [ref]);

    useEffect(() => {
        EventBus.on("current-scene-ready", (newScene: Phaser.Scene) => {
            props.onSceneReady?.(newScene);
            if (ref.current != null) {
                ref.current.scene = newScene;
            }
        });

        return () => {
            EventBus.removeListener("current-scene-ready");
        }
    }, [props.onSceneReady, ref])

    return (
        <div id="game-container"></div>
    );
}

export default PhaserGame;
export type { PhaserGameRef };
