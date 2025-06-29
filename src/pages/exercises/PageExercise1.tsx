import "./PageExercise1.css";

import type { PageWithExercise } from "../../types/Page";

import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

import { updateSandbox } from "../../reducers/pages/pageDesignObstacles";
import { completeExercise } from "../../reducers/exerciseSlice";

import DragHandler from "../../components/drag-handler/DragHandler";
import GameMap from "../../game/logic/GameMap";
import PageInteractivePanel from "../PageInteractivePanel";
import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";

import PhaserGame, { type PhaserGameRef } from "../../game/PhaserGame";

type PageExercise1Props = {
    page: PageWithExercise;
};

function PageExercise1(props: PageExercise1Props) {
    const dispatch = useAppDispatch();
    const sandbox = useAppSelector(state => state.pageDesignObstacles.sandbox);
    const defaultConfig = props.page.sandboxPlaceholder!;

    const phaserRef = useRef<PhaserGameRef>(null);

    function onSaveClicked(sandboxValue: string) {
        dispatch(updateSandbox(sandboxValue));
        dispatch(completeExercise(props.page.id));
    }

    return (
        <PanelsLayout
            columns={[
                { defaultWeight: 1, minWidth: 400, content: <PageInteractivePanel page={props.page} sandbox={sandbox} sandboxPlaceholder={props.page.sandboxPlaceholder} onSaveSandbox={onSaveClicked} /> },
                { defaultWeight: 1, minWidth: 500, content: <PhaserGame viewport={{width:480,height:680}} game={{map: GameMap.fromConfigFile(sandbox ?? defaultConfig)}} ref={phaserRef} /> },
            ]}
            resizer={<DragHandler variant="collapsed" />}
        />
    );
}

export default PageExercise1;
export type { PageExercise1Props };
