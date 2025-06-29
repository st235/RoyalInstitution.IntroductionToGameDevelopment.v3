
import "./PageInteractivePanel.css";

import type { PageWithExercise } from "../types/Page";

import Sandbox from "../components/sandbox/Sandbox";
import ExerciseCard from "../components/exercise-card/ExerciseCard";

type PageInteractivePanelProps = {
    page: PageWithExercise;
    sandbox?: string;
    sandboxPlaceholder?: string;
    onSaveSandbox: (sandbox: string) => void;
};

function PageInteractivePanel(props: PageInteractivePanelProps) {
    return (
        <div className="page-interactive-panel">
            <ExerciseCard ordinal={props.page.ordinal} title={props.page.title} description={props.page.description} />
            <Sandbox value={props.sandbox} placeholder={props.sandboxPlaceholder} initialLinesCount={10} onSaveClicked={props.onSaveSandbox} />
        </div>
    );
}

export default PageInteractivePanel;
export type { PageInteractivePanelProps };
