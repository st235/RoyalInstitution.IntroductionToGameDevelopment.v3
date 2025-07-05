import "./PageExercise3.css";

import { useMemo, useRef } from "react";

import type { GameConfig } from "../../game/GameConfig";
import type { PageWithExercise } from "../../types/Page";
import type { PhaserGameContainerRef } from "../../game/PhaserGameContainer";

import { completeExercise } from "../../reducers/exerciseSlice";
import { updateSandbox } from "../../reducers/pages/pageEasyController";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import DragHandler from "../../components/drag-handler/DragHandler";
import GameMap from "../../game/logic/GameMap";
import PageInteractivePanel from "../PageInteractivePanel";
import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";
import PhaserGame from "../../game/PhaserGameContainer";
import ProgrammableMovementController from "../../game/logic/movement-controller/ProgrammableMovementController";
import ManualMetaLoopAdancer from "../../game/logic/loop/ManualMetaLoopAdvancer";

const defaultGameMap = `
40,30
`;

type PageExercise3Props = {
    page: PageWithExercise;
};

function PageExercise3(props: PageExercise3Props) {
    const dispatch = useAppDispatch();
    const sandbox = useAppSelector(state => state.pageEasyController.sandbox);

    const phaserRef = useRef<PhaserGameContainerRef>(null);

    const gameConfig = useMemo(() => {
        return CreateGameConfig(sandbox ?? "function () {return \"up\";}");
    }, [sandbox]);

    function onSaveClicked(sandboxValue: string) {
        dispatch(updateSandbox(sandboxValue));
    }

    function CreateGameConfig(rawFunctionCode: string): GameConfig {
        return {
            map: GameMap.fromConfigFile(defaultGameMap),
            metaLoopAdvancer: ManualMetaLoopAdancer.create(),
            movementController: ProgrammableMovementController.create(rawFunctionCode),
            onFoodItemConsumed: score => {
                if (score > 100) {
                    dispatch(completeExercise(props.page.id));
                }
            },
        }
    }

    return (
        <PanelsLayout
            columns={[
                { defaultWeight: 1, minWidth: 400, content: <PageInteractivePanel page={props.page} sandbox={sandbox} sandboxPlaceholder={props.page.sandboxPlaceholder} onSaveSandbox={onSaveClicked} /> },
                { defaultWeight: 1, minWidth: 500, content: <PhaserGame viewport={{width:480,height:680}} game={gameConfig} ref={phaserRef} /> },
            ]}
            resizer={<DragHandler variant="collapsed" />}
        />
    );
}

export default PageExercise3;
export type { PageExercise3Props };
