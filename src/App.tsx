import React from 'react';
import MJMLEditor from './components/MJMLEditor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1 className="title">MJML Email Editor</h1>
      <MJMLEditor />
    </div>
  );
};

export default App;
