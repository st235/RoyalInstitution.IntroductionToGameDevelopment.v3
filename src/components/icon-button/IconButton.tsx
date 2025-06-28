import "./IconButton.css";

import React from 'react';

type IconButtonProps = {
    textIcon?: string;
    imageIcon?: string;
    variant: 'primary';
    onClick?: () => void;
};

function IconButton(props: IconButtonProps) {
    let cssStyle: React.CSSProperties = {};

    return (
        <div className={`icon-button ${props.variant}`} style={cssStyle} onClick={props.onClick}>
            {props.textIcon && <span className="text-icon">{props.textIcon}</span>}
            {props.imageIcon && <img className="image-icon" src={props.imageIcon} />}
        </div>
    );
}

export default IconButton;
