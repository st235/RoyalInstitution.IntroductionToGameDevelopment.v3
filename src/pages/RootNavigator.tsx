import './RootNavigator.css';

import { useState } from 'react';

import DragHandler from '../components/drag-handler/DragHandler';
import PanelsLayout from '../components/resizeable-layout/PanelsLayout';
import TaskList from '../components/task-list/TaskList';

function RootNavigator() {
  return (
    <div id="root-navigator">
      <PanelsLayout columns={[
        { defaultWeight: 1, resizeable: false, minWidth: 300, content: <TaskList /> },
        { defaultWeight: 5, minWidth: 400, content: <div>Hello world 2</div> },
        { defaultWeight: 10, minWidth: 600, content: <div>Hello world 3</div> },
      ]}
      resizer={<DragHandler />} />
    </div>
  )
}

export default RootNavigator;
