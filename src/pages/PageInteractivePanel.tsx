
import "./PageInteractivePanel.css";
import IconFloppyFill from "../assets/ic-floppy-fill.svg";

import type { PageWithExercise } from "../types/Page";

import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";

import { updateSandbox } from "../reducers/pages/pageGameAndLearnSlice";
import { completeExercise } from "../reducers/exerciseSlice";

import Sandbox from "../components/sandbox/Sandbox";
import ExerciseCard from "../components/exercise-card/ExerciseCard";
import Button from "../components/button/Button";

type PageInteractivePanelProps = {
    page: PageWithExercise;
    sandbox?: string;
    sandboxPlaceholder?: string;
};

function PageInteractivePanel(props: PageInteractivePanelProps) {
    const dispatch = useAppDispatch();

    function onSaveClicked(sandboxValue: string) {
        if (sandboxValue?.length > 0) {
            dispatch(updateSandbox(sandboxValue));
            dispatch(completeExercise(props.page.id));
            console.log("On saved");
        }
    }

    return (
        <div className="page-interactive-panel">
            <ExerciseCard ordinal={props.page.ordinal} title={props.page.title} description={props.page.description} />
            <Sandbox value={props.sandbox} placeholder={props.sandboxPlaceholder} initialLinesCount={10} onSaveClicked={onSaveClicked} />
        </div>
    );
}

export default PageInteractivePanel;
export type { PageInteractivePanelProps };
