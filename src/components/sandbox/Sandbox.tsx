import "./Sandbox.css";

import { useMemo, useState } from "react";

type SandboxProps = {
    initialLinesCount: number;
    onValueChange: (value: string) => void;
    placeholder?: string;
    name?: string;
    value?: string;
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
                    props.onValueChange(e.target.value);
                }}
                wrap="off"
            />
        </div>
    );
}

export default Sandbox;
export type { SandboxProps };
