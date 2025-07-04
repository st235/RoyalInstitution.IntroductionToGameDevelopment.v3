import "./PhaserGameContainer.css";
import IconPlay from "../assets/ic-play-circle.svg";
import IconPause from "../assets/ic-pause-circle.svg";
import IconReload from "../assets/ic-reload.svg";
import IconForward from "../assets/ic-forward.svg";
import IconSkipForward from "../assets/ic-skip-forward.svg";

import type { GameConfig } from "./GameConfig";

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import Phaser from "phaser";

import StartGame from "./StartGame";
import { EventBus } from "./EventBus";
import Button from "../components/button/Button";
import ManualMetaLoopAdancer from "./logic/loop/ManualMetaLoopAdvancer";

type PhaserGameContainerState = "running" | "paused";

type PhaserGameContainerRef = {
    game: Phaser.Game;
    activeScene: Phaser.Scene | null;
} | null;

type PhaserGameContainerProps = {
    viewport: {
        width: number;
        height: number;
    };
    game: GameConfig;
    ref: React.RefObject<PhaserGameContainerRef>;
    state?: PhaserGameContainerState;
    onSceneReady?: (scene: Phaser.Scene) => void;
};

function PhaserGameContainer(props: PhaserGameContainerProps) {
    const ref = props.ref;
    const gameConfig = props.game;
    const isManualMetaLoopAdvancer = (gameConfig.metaLoopAdvancer instanceof ManualMetaLoopAdancer);

    const game = useRef<Phaser.Game>(null);
    const [gameState, setGameState] = useState<PhaserGameContainerState>(props.state ?? "paused");
    const [isAutoAdvancing, setIsAutoAdvancing] = useState<boolean>(false);

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
            gameRef.game.scene.start("default", { ...gameConfig });
        }
        if (isManualMetaLoopAdvancer) {
            // Reset auto advancement.
            (gameConfig.metaLoopAdvancer as ManualMetaLoopAdancer).setAutoAdvance(undefined);
            setIsAutoAdvancing(false);
        }
    }

    function OnPauseClicked() {
        setGameState("paused");
        if (isManualMetaLoopAdvancer) {
            (gameConfig.metaLoopAdvancer as ManualMetaLoopAdancer).setAutoAdvance(undefined);
        }
    }

    function OnResumeClicked() {
        setGameState("running");
        if (isManualMetaLoopAdvancer) {
            (gameConfig.metaLoopAdvancer as ManualMetaLoopAdancer).setAutoAdvance(150);
        }
    }

    function OnReloadClicked() {
        _RestartGame();
        setGameState("running");
    }

    function OnManualAdvance() {
        (gameConfig.metaLoopAdvancer as ManualMetaLoopAdancer).advance();
    }

    function OnAutoAdvance(shouldAutoAdvance: boolean) {
        const manualAdvancer = gameConfig.metaLoopAdvancer as ManualMetaLoopAdancer;
        if (shouldAutoAdvance) {
            manualAdvancer.setAutoAdvance(150);
        } else {
            manualAdvancer.setAutoAdvance(undefined);
        }
        setIsAutoAdvancing(shouldAutoAdvance);
    }

    useLayoutEffect(() => {
        if (!game.current) {
            game.current = StartGame(
                "game-canvas",
                props.viewport.width,
                props.viewport.height,
            );
            game.current.scene.start("default", { ...gameConfig });

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
                <span className="title">Game state</span>
                <div className="row">
                    <Button variant="primary" leftIcon={IconReload} text="Restart" onClick={OnReloadClicked} />

                    {(isManualMetaLoopAdvancer && isAutoAdvancing) && <Button variant="primary" leftIcon={IconPlay} text="Advance Manually" onClick={() => OnAutoAdvance(false)} />}
                    {(isManualMetaLoopAdvancer && !isAutoAdvancing) && <Button variant="primary" leftIcon={IconSkipForward} text="Advance Automatically" onClick={() => OnAutoAdvance(true)} />}
                    {(isManualMetaLoopAdvancer && !isAutoAdvancing) && <Button variant="primary" leftIcon={IconForward} text="Step" onClick={OnManualAdvance} />}

                    {(!isManualMetaLoopAdvancer && gameState == "running") && <Button variant="primary" leftIcon={IconPause} text="Pause" onClick={OnPauseClicked} />}
                    {(!isManualMetaLoopAdvancer && gameState == "paused") && <Button variant="primary" leftIcon={IconPlay} text="Resume" onClick={OnResumeClicked} />}
                </div>
            </div>
        </div>
    );
}

export default PhaserGameContainer;
export type { PhaserGameContainerState, PhaserGameContainerRef, PhaserGameContainerProps };
