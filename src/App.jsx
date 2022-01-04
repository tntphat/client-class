import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routers } from './routers/index';
import { loadGA } from './helpers';
import GA from './components/GA/GA';
// import ReactGA from 'react-ga';
// ReactGA.initialize('UA-216010316-1');
function App() {
  return (
    <div className="App">
      {/* <GA /> */}
      <Routers></Routers>
    </div>
  );
}

export default App;
