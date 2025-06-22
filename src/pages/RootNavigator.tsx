import './RootNavigator.css';

import { useState, useRef } from 'react';

import DragHandler from '../components/drag-handler/DragHandler';
import PanelsLayout from '../components/resizeable-layout/PanelsLayout';
import TaskList from '../components/task-list/TaskList';

import PhaserGame, { type PhaserGameRef } from '../game/PhaserGame';

function RootNavigator() {
  const phaserRef = useRef<PhaserGameRef>(null);

  return (
    <div id="root-navigator">
      <PanelsLayout columns={[
        { defaultWeight: 1, resizeable: false, minWidth: 400, content: <TaskList /> },
        { defaultWeight: 1, minWidth: 400, content: <div>Hello world 2</div> },
        { defaultWeight: 2, minWidth: 800, content: <PhaserGame ref={phaserRef} /> },
      ]}
      resizer={<DragHandler />} />
    </div>
  )
}

export default RootNavigator;
