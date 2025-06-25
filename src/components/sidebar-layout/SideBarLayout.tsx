import "./SideBarLayout.css";

import React from 'react';

import DragHandler from "../drag-handler/DragHandler";

interface SideBarLayoutProps extends React.PropsWithChildren {
  sidebar: React.ReactNode;
};

function SideBarLayout(props: SideBarLayoutProps) {
  return (
    <div className="sidebar-layout">
        <div className="sidebar-rail">
            {props.sidebar}
            <DragHandler variant="expanded" />
        </div>
        <div className="content">
            {props.children}
        </div>
    </div>
  )
}

export default SideBarLayout;
