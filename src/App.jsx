import './App.css';
import React from 'react';
import { Routers } from './routers/index';
import { useDispatch, useSelector } from 'react-redux';
import { ModalLoading } from './components/common';

function App() {
  const { isLoading } = useSelector((state) => state.modalLoading);

  return (
    <div className="App">
      <Routers></Routers>
      {isLoading ? <ModalLoading /> : null}
    </div>
  );
}

export default App;
