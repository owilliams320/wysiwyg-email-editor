import React, { useState } from 'react';
import MJMLEditor from './components/MJMLEditor';
import './App.css';
import SideSheet from './components/SideSheet/SideSheet';
import TreeList from './components/TreeList/TreeList';
import { templates } from './templates';

const App: React.FC = () => {
  const [isSideSheetOpen, setSideSheetOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(
    'templates/marketing/marketingTemplate1.mjml'
  );

  const toggleSideSheet = () => {
    setSideSheetOpen(!isSideSheetOpen);
  };

  const handleItemClick = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <>
      <div className="app">
        <div className="title">
          <span
            className="material-symbols-outlined menu-icon"
            onClick={toggleSideSheet}
          >
            menu
          </span>
          <img
            src="https://cdn.jsdelivr.net/gh/bsahitya/wysiwyg-email-editor/public/images/teradata.svg"
            alt=""
          />
          <h2>MJML Email Editor (Another PR PREVIEW! 🦬)</h2>
        </div>
        <MJMLEditor selectedTemplate={selectedValue} />
        <SideSheet
          isOpen={isSideSheetOpen}
          onClose={toggleSideSheet}
          title="Templates"
        >
          <TreeList nodes={templates} onItemClick={handleItemClick} />
        </SideSheet>
      </div>
    </>
  );
};

export default App;
