import "./NavigationRail.css";

import React from 'react';

type NavigationRailProps = {
    header?: React.ReactNode;
    footer?: React.ReactNode;
};

function NavigationRail(props: NavigationRailProps) {
  return (
    <div className="navigation-rail">
        <div className="header">{props.header}</div>
        <div className="icons"></div>
        <div className="footer">{props.footer}</div>
    </div>
  )
}

export default NavigationRail;
