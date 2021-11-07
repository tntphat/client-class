import './App.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Routers } from './routers/index';

function App() {
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <Routers />
    </div>
  );
}

export default App;
