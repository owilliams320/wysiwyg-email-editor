import React from 'react';
import './Preview.css';

interface PreviewProps {
  html: string;
}

const Preview: React.FC<PreviewProps> = ({ html }) => {
  return (
    <div className="preview-container">
      {html ? (
        <iframe
          title="Mjml"
          srcDoc={html}
          style={{
            width: '100%',
            height: '99.5%',
            border: 'none',
            boxSizing: 'border-box',
          }}
        />
      ) : (
        <p>Loading preview...</p>
      )}
    </div>
  );
};

export default Preview;
