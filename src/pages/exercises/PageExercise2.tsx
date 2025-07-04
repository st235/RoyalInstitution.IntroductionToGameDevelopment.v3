import "./PageExercise2.css";

import { useMemo, useRef } from "react";

import type { GameConfig } from "../../game/GameConfig";
import type { MovementDirection } from "../../game/logic/movement-controller/SnakeMovementController";
import type { PageWithExercise } from "../../types/Page";
import type { PhaserGameContainerRef } from "../../game/PhaserGameContainer";

import { completeExercise } from "../../reducers/exerciseSlice";
import { updateSandbox } from "../../reducers/pages/pageSolveMaze";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import DragHandler from "../../components/drag-handler/DragHandler";
import GameMap from "../../game/logic/GameMap";
import PageInteractivePanel from "../PageInteractivePanel";
import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";
import PhaserGame from "../../game/PhaserGameContainer";
import MovementDirectionListController from "../../game/logic/movement-controller/MovementDirectionListController";
import ManualMetaLoopAdancer from "../../game/logic/loop/ManualMetaLoopAdvancer";

const defaultGameConfig = `
21,16
.,#,s,f
s..#############
...#..#..#.....#
#..#..#..#..#..#
#...........#..#
#..#..#..####..#
#..#..#.....#..#
####..#..####..#
#.....#.....#..#
#..#..#######..#
#..#........#..#
#######..####..#
#..#..#..#.....#
#..#..#..#######
#.....#........#
####..#..#..#..#
#..#..#..#..#..#
#..#..#######..#
#..............#
#..#######..#..#
#.....#.....#...
#############..f
`;

type PageExercise2Props = {
    page: PageWithExercise;
};

function PageExercise2(props: PageExercise2Props) {
    const dispatch = useAppDispatch();
    const sandbox = useAppSelector(state => state.pageSolveMaze.sandbox);

    const phaserRef = useRef<PhaserGameContainerRef>(null);

    const gameConfig = useMemo(() => {
        const directions = (sandbox ?? "").trim().split("\n");
        return CreateGameConfig(directions as MovementDirection[]);
    }, [sandbox]);

    function onSaveClicked(sandboxValue: string) {
        dispatch(updateSandbox(sandboxValue));
    }

    function CreateGameConfig(directions: MovementDirection[]): GameConfig {
        return {
            map: GameMap.fromConfigFile(defaultGameConfig),
            metaLoopAdvancer: ManualMetaLoopAdancer.create(),
            movementController: MovementDirectionListController.create(directions),
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

export default PageExercise2;
export type { PageExercise2Props };
