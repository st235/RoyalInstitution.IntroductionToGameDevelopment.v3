import "./Sandbox.css";
import IconFloppyFill from "../../assets/ic-floppy-fill.svg";

import { useMemo, useState } from "react";

import Button from "../button/Button";

type SandboxProps = {
    placeholder?: string;
    name?: string;
    value?: string;
    minLines: number;
    extraLinesOffset?: number;
    onSaveClicked?: (value: string) => void;
    onValueChanged?: (value: string) => void;
};

function Sandbox(props: SandboxProps) {
    const [value, setValue] = useState(props.value ?? "");

    const lineCount = useMemo(() => {
        const extraLinesOffset = props.extraLinesOffset ?? 0;
        let count = props.minLines;

        if (value && value.length > 0) {
            count = Math.max(count, value.split("\n").length + extraLinesOffset);
        } else if (props.placeholder) {
            count = Math.max(count, props.placeholder?.split("\n").length + extraLinesOffset);
        }

        return count;
    }, [props.placeholder, props.minLines, props.extraLinesOffset, value]);

    const linesArray = useMemo(() =>
            Array.from(
                { length: lineCount },
                (_, i) => i + 1
            ), [lineCount, props.minLines]);

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
