import React, { useRef, useState, useEffect } from "react";

import "./Panel.css";

interface PanelProps extends React.PropsWithChildren {
    ref: React.RefObject<HTMLDivElement>;
    defaultWeight: number;
    overwriteWidth?: number;
    minWidth?: number;
};

export default function Panel(props: PanelProps) {
    const cssProps = {
        width: props.overwriteWidth,
        minWidth: props.minWidth,
        flexShrink: 0,
        flexBasis: 'auto',
    } as React.CSSProperties;

    if (!props.overwriteWidth) {
        cssProps.flexGrow = props.defaultWeight;
    }

    return (
        <div ref={props.ref}
             className="panel"
             style={cssProps}>
            {props.children}
        </div>
    );
}
