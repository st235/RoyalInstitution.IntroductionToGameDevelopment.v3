import './RootNavigator.css';

import { useState, useRef } from 'react';

import SidebarLayout from '../components/sidebar-layout/SideBarLayout';
import NavigationRail from '../components/navigation-rail/NavigationRail';
import Logo from '../components/logo/Logo';

import PhaserGame, { type PhaserGameRef } from '../game/PhaserGame';

function RootNavigator() {
  const phaserRef = useRef<PhaserGameRef>(null);

  return (
    <div id="root-navigator">
      <SidebarLayout sidebar={<NavigationRail header={<Logo />} />} />
    </div>
  )
}

export default RootNavigator;

      // <PanelsLayout columns={[
      //   { defaultWeight: 1, resizeable: false, minWidth: 400, content: <TaskList /> },
      //   { defaultWeight: 1, minWidth: 400, content: <div>Hello world 2</div> },
      //   { defaultWeight: 2, minWidth: 800, content: <PhaserGame ref={phaserRef} /> },
      // ]}
      // resizer={<DragHandler />} />
