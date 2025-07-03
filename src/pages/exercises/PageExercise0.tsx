import "./PageExercise0.css";

import type { PageWithExercise } from "../../types/Page";

import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

import { updateSandbox } from "../../reducers/pages/pageGameAndLearnSlice";
import { completeExercise } from "../../reducers/exerciseSlice";

import DragHandler from "../../components/drag-handler/DragHandler";
import GameMap from "../../game/logic/GameMap";
import PageInteractivePanel from "../PageInteractivePanel";
import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";

import PhaserGame, { type PhaserGameRef } from "../../game/PhaserGameContainer";

type PageExercise0Props = {
    page: PageWithExercise;
};

function PageExercise0(props: PageExercise0Props) {
    const dispatch = useAppDispatch();
    const sandbox = useAppSelector(state => state.pageGameAndLearn.sandbox);

    const phaserRef = useRef<PhaserGameRef>(null);

    function onSaveClicked(sandboxValue: string) {
        if (sandboxValue?.length > 0) {
            dispatch(updateSandbox(sandboxValue));
            dispatch(completeExercise(props.page.id));
        }
    }

    return (
        <PanelsLayout
            columns={[
                { defaultWeight: 1, minWidth: 400, content: <PageInteractivePanel page={props.page} sandbox={sandbox} sandboxPlaceholder={props.page.sandboxPlaceholder} onSaveSandbox={onSaveClicked} /> },
                { defaultWeight: 1, minWidth: 500, content: <PhaserGame viewport={{width:480,height:680}} game={{map: new GameMap(40, 30, [])}} ref={phaserRef} /> },
            ]}
            resizer={<DragHandler variant="collapsed" />}
        />
    );
}

export default PageExercise0;
export type { PageExercise0Props };
