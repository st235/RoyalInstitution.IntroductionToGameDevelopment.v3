import "./PageExercise4.css";

import { useMemo, useRef } from "react";

import type { GameConfig } from "../../game/GameConfig";
import type { PageWithExercise } from "../../types/Page";
import type { PhaserGameContainerRef } from "../../game/PhaserGameContainer";

import { completeExercise } from "../../reducers/exerciseSlice";
import { updateSandbox } from "../../reducers/pages/pageControllerSingleObstacle";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import DragHandler from "../../components/drag-handler/DragHandler";
import GameMap from "../../game/logic/GameMap";
import PageInteractivePanel from "../PageInteractivePanel";
import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";
import PhaserGame from "../../game/PhaserGameContainer";
import ProgrammableMovementController from "../../game/logic/movement-controller/ProgrammableMovementController";
import ManualMetaLoopAdancer from "../../game/logic/loop/ManualMetaLoopAdvancer";

const defaultGameMap = `
20,15
.,#,s,f
...............
...............
.......s.......
...............
...............
...............
...............
...............
...............
..###########..
...............
...............
...............
...............
...............
...............
...............
.......f.......
...............
...............
`;

type PageExercise4Props = {
    page: PageWithExercise;
};

function PageExercise4(props: PageExercise4Props) {
    const dispatch = useAppDispatch();
    const sandbox = useAppSelector(state => state.pageControllerSingleObstacle.sandbox);

    const phaserRef = useRef<PhaserGameContainerRef>(null);

    const gameConfig = useMemo(() => {
        return CreateGameConfig(sandbox ?? "function () {return \"down\";}");
    }, [sandbox]);

    function onSaveClicked(sandboxValue: string) {
        dispatch(updateSandbox(sandboxValue));
    }

    function CreateGameConfig(rawFunctionCode: string): GameConfig {
        return {
            map: GameMap.fromConfigFile(defaultGameMap),
            metaLoopAdvancer: ManualMetaLoopAdancer.create(),
            movementController: ProgrammableMovementController.create(rawFunctionCode),
            onFoodItemConsumed: _ => {
                dispatch(completeExercise(props.page.id));
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

export default PageExercise4;
export type { PageExercise4Props };
