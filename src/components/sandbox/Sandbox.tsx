import "./Sandbox.css";
import IconFloppyFill from "../../assets/ic-floppy-fill.svg";

import { useMemo, useState } from "react";

import Button from "../button/Button";

type SandboxProps = {
    initialLinesCount: number;
    placeholder?: string;
    name?: string;
    value?: string;
    onSaveClicked?: (value: string) => void;
    onValueChanged?: (value: string) => void;
};

function Sandbox(props: SandboxProps) {
    const [value, setValue] = useState(props.value ?? "");

    const lineCount = useMemo(() => value.split("\n").length, [value]);
    
    const linesArray = useMemo(() =>
            Array.from(
                { length: Math.max(props.initialLinesCount, lineCount) },
                (_, i) => i + 1
            ), [lineCount, props.initialLinesCount]);

    return (
        <div className="sandbox-wrapper">
            <ul className="sandbox-lines">
                {linesArray.map(line => (
                    <li key={line} className="line">{line}</li>
                ))}
            </ul>
            <textarea className="sandbox-textarea"
                name={props.name}
                value={value}
                placeholder={props.placeholder}
                onChange={e => {
                    setValue(e.target.value);
                    props.onValueChanged?.(e.target.value);
                }}
                wrap="off"
            />
            <div className="save-button">
                <Button
                    leftIcon={IconFloppyFill}
                    text="Save"
                    variant="primary"
                    onClick={() => props.onSaveClicked?.(value)} />
            </div>
        </div>
    );
}

export default Sandbox;
export type { SandboxProps };
