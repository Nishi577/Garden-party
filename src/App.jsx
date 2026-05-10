import React, { useState } from 'react';
import WelcomeGarden from './components/WelcomeGarden';
import MemoryWalk from './components/MemoryWalk';
import EffortMeter from './components/EffortMeter';
import GratitudeTree from './components/GratitudeTree';
import TuneTime from './components/TuneTime';
import LoveCapsule from './components/LoveCapsule';
import './styles/global.css';

const PAGES = ['welcome', 'memory', 'effort', 'tree', 'tune', 'capsule'];

function App() {
  const [page, setPage] = useState('welcome');
  const [badge, setBadge] = useState(null);

  const goTo = (p) => setPage(p);

  return (
    <>
      {page === 'welcome'  && <WelcomeGarden  onNext={() => goTo('memory')} />}
      {page === 'memory'   && <MemoryWalk     onNext={() => goTo('effort')} />}
      {page === 'effort'   && <EffortMeter    onNext={() => goTo('tree')} onBadge={setBadge} />}
      {page === 'tree'     && <GratitudeTree  onNext={() => goTo('tune')} />}
      {page === 'tune'     && <TuneTime       onNext={() => goTo('capsule')} />}
      {page === 'capsule'  && <LoveCapsule    onRestart={() => goTo('welcome')} badge={badge} />}
    </>
  );
}

export default App;
