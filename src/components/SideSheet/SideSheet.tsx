import React, { ReactNode } from 'react';
import './SideSheet.css';

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const SideSheet: React.FC<SideSheetProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  return (
    <div className={`side-sheet ${isOpen ? 'open' : ''}`}>
      <div className="side-sheet-content">
        <div className="side-sheet-title">
          <h3>{title}</h3>
          <span
            className="material-symbols-outlined close-icon"
            onClick={onClose}
          >
            close
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SideSheet;
