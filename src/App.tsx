import { useState } from 'react';

import PanelsLayout  from './components/resizeable-layout/PanelsLayout';

import './App.css';

function App() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <PanelsLayout columns={[
        { defaultWeight: 1, minWidth: 100, content: <div>Hello world</div> },
        { defaultWeight: 1, minWidth: 100, content: <div>Hello world 2</div> },
        { defaultWeight: 1, minWidth: 100, content: <div>Hello world 3</div> },
        { defaultWeight: 1, minWidth: 100, content: <div>Hello world 4</div> },
      ]}
      resizer={<div className='myresizer'></div>} />
    </div>
  )
}

export default App;
