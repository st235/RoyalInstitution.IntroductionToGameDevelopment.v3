import "./PageExercise0.css";

import type { PageWithExercise } from "../../types/Page";

import { useRef } from "react";
import { useAppSelector } from "../../hooks/redux";

import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";
import DragHandler from "../../components/drag-handler/DragHandler";
import PageInteractivePanel from "../PageInteractivePanel";

import PhaserGame, { type PhaserGameRef } from "../../game/PhaserGame";

type PageExercise0Props = {
    page: PageWithExercise;
};

function PageExercise0(props: PageExercise0Props) {
    const sandbox = useAppSelector(state => state.pageGameAndLearn.sandbox);

    const phaserRef = useRef<PhaserGameRef>(null);

    return (
        <PanelsLayout
            columns={[
                { defaultWeight: 1, minWidth: 400, content: <PageInteractivePanel page={props.page} sandbox={sandbox} sandboxPlaceholder={props.page.sandboxPlaceholder} /> },
                { defaultWeight: 1, minWidth: 600, content: <PhaserGame viewport={{width:480,height:680}} game={{rows:40, columns:30}} ref={phaserRef} /> },
            ]}
            resizer={<DragHandler variant="collapsed" />}
        />
    );
}

export default PageExercise0;
export type { PageExercise0Props };
