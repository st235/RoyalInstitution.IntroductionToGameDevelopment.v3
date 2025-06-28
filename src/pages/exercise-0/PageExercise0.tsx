import "./PageExercise0.css";
import IconFloppyFill from "../../assets/ic-floppy-fill.svg";

import type { ExerciseTask } from "../../types/Exercise";

import { useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";

import { updateSandbox } from "../../reducers/pages/pageGameAndLearnSlice";
import { completeExercise } from "../../reducers/exerciseSlice";

import PanelsLayout from "../../components/resizeable-layout/PanelsLayout";
import Sandbox from "../../components/sandbox/Sandbox";
import DragHandler from "../../components/drag-handler/DragHandler";
import ExerciseCard from "../../components/exercise-card/ExerciseCard";
import Button from "../../components/button/Button";

import PhaserGame, { type PhaserGameRef } from "../../game/PhaserGame";

type LeftPanelProps = {
    exercise: ExerciseTask;
    sandbox?: string;
};

function LeftPanel(props: LeftPanelProps) {
    const dispatch = useAppDispatch();
    const [sandboxValue, setSandboxValue] = useState(props.sandbox ?? "");

    function onSandboxValueChanged(value: string) {
        setSandboxValue(value);
    }

    function onSaveClick() {
        if (sandboxValue?.length > 0) {
            dispatch(updateSandbox(sandboxValue));
            dispatch(completeExercise(props.exercise.id));
            console.log("On saved");
        }
    }

    return (
        <div className="page-exercise-0">
            <ExerciseCard ordinal={props.exercise.ordinal} title={props.exercise.title} description={props.exercise.description} />
            <Sandbox value={props.sandbox} initialLinesCount={10} onValueChange={onSandboxValueChanged} />
            <Button leftIcon={IconFloppyFill} text="Click me" variant="primary" onClick={onSaveClick} />
        </div>
    );
}

type PageExercise0Props = {
    exercise: ExerciseTask;
};

function PageExercise0(props: PageExercise0Props) {
    const sandbox = useAppSelector(state => state.pageGameAndLearn.sandbox);

    const phaserRef = useRef<PhaserGameRef>(null);

    return (
        <PanelsLayout
            columns={[
                { defaultWeight: 1, minWidth: 400, content: <LeftPanel exercise={props.exercise} sandbox={sandbox} /> },
                { defaultWeight: 1, minWidth: 600, content: <PhaserGame ref={phaserRef} /> },
            ]}
            resizer={<DragHandler variant="collapsed" />}
        />
    );
}

export default PageExercise0;
export type { PageExercise0Props };
