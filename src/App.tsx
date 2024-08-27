import React from 'react';
import MJMLEditor from './components/MJMLEditor';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="title">
        <img src="/wysiwyg-email-editor/teradata.svg" alt="" />
        <h2>MJML Email Editor</h2>
      </div>
      <MJMLEditor />
    </div>
  );
};

export default App;
