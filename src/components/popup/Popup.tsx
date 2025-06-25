import "./Popup.css";

import React from 'react';

type PopupProps = {
    className?: string;
    content: React.ReactNode;
    popupContent: React.ReactNode;
};

function Popup(props: PopupProps) {
  return (
    <div className={`popup-container ${props.className ?? ""}`}>
        {props.content}
        <div className="popup">{props.popupContent}</div>
    </div>
  )
}

export default Popup;
export type { PopupProps };
