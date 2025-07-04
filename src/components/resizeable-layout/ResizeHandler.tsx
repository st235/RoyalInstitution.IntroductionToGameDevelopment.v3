import React from "react";

import "./ResizeHandler.css";

interface ResizeHandlerProps extends React.PropsWithChildren {
    id: number,
    onStartDragging?: (id: number, event: React.PointerEvent) => void;
};

function ResizeHandler(props: ResizeHandlerProps) {
    const id = props.id;

    return (
        <div className="resizer"
            onPointerDown={event => props.onStartDragging?.(id, event)}>
            {props.children}
        </div>
    );
}

export default ResizeHandler;
export type { ResizeHandlerProps };
