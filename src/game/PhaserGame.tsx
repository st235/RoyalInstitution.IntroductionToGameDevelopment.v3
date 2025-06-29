import "./PhaserGame.css";
import IconPlay from "../assets/ic-play-circle.svg";
import IconPause from "../assets/ic-pause-circle.svg";
import IconReload from "../assets/ic-reload.svg";

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import Phaser from "phaser";

import StartGame from "./StartGame";
import { EventBus } from "./EventBus";
import Button from "../components/button/Button";

type PhaserGameState = "running" | "paused";

type PhaserGameRef = {
    game: Phaser.Game;
    activeScene: Phaser.Scene | null;
} | null;

type PhaserGameProps = {
    viewport: {
        width: number;
        height: number;
    };
    game: {
        rows: number;
        columns: number;
    };
    ref: React.RefObject<PhaserGameRef>;
    state?: PhaserGameState;
    onSceneReady?: (scene: Phaser.Scene) => void;
};

function PhaserGame(props: PhaserGameProps) {
    const ref = props.ref;

    const game = useRef<Phaser.Game>(null);
    const [gameState, setGameState] = useState<PhaserGameState>(props.state ?? "paused");

    function _PauseGame() {
        const gameRef = ref.current;
        if (gameRef) {
            gameRef.game.pause();
            gameRef.game.input.enabled = false;
            if (gameRef.game.input.keyboard) {
                gameRef.game.input.keyboard.enabled = false;
            }
        }
    }

    function _ResumeGame() {
        const gameRef = ref.current;
        if (gameRef) {
            gameRef.game.resume();
            gameRef.game.input.enabled = true;
            if (gameRef.game.input.keyboard) {
                gameRef.game.input.keyboard.enabled = true;
            }
        }
    }

    function _RestartGame() {
        const gameRef = ref.current;
        if (gameRef) {
            gameRef.game.scene.start("default", { ...props.game });
        }
    }

    function OnPauseClicked() {
        setGameState("paused");
    }

    function OnResumeClicked() {
        setGameState("running");
    }

    function OnReloadClicked() {
        _RestartGame();
        setGameState("running");
    }

    useLayoutEffect(() => {
        if (!game.current) {
            game.current = StartGame(
                "game-canvas",
                props.viewport.width,
                props.viewport.height,
            );
            game.current.scene.start("default", { ...props.game });

            if (ref !== null) {
                ref.current = { game: game.current, activeScene: null };
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
                ref.current.activeScene = newScene;
            }
        });

        return () => {
            EventBus.removeListener("current-scene-ready");
        }
    }, [props.onSceneReady, ref]);

    useEffect(() => {
        const gameRef = ref.current;

        if (gameRef) {
            if (gameState == "paused") {
                _PauseGame();
            } else if (gameState == "running") {
                _ResumeGame();
            }
        }
    }, [gameState, ref]);

    return (
        <div className="game-container"
            onMouseLeave={OnPauseClicked}>
            <div id="game-canvas" />
            <div className="control-panel">
                {gameState == "running" && <Button variant="primary" leftIcon={IconPause} text="Pause" onClick={OnPauseClicked} />}
                {gameState == "paused" && <Button variant="primary" leftIcon={IconPlay} text="Resume" onClick={OnResumeClicked} />}
                <Button variant="primary" leftIcon={IconReload} text="Reload" onClick={OnReloadClicked} />
            </div>
        </div>
    );
}

export default PhaserGame;
export type { PhaserGameState, PhaserGameRef, PhaserGameProps };
