import React, { useRef, useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parserHtml from 'prettier/parser-html'; // Use 'html' parser if working with MJML
import './MonacoEditor.css';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  combinedMjml?: string;
  parsedHtml?: string;
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  combinedMjml,
  parsedHtml,
}) => {
  const [editorValue, setEditorValue] = useState(value);
  const editorInstance = useRef<any>(null); // Use ref to hold editor instance

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      onChange(value);
    }
  };

  const handleEditorMount = (editor: any) => {
    editorInstance.current = editor; // Set editor instance to ref
  };

  const handleCopyClick = (content = '') => {
    if (content) {
      navigator.clipboard.writeText(content).then(
        () => {
          console.log('Copying to clipboard was successful!');
        },
        (err) => {
          console.error('Could not copy text: ', err);
        }
      );
    }
  };

  const formatCode = () => {
    if (editorInstance.current) {
      const unformattedCode = editorInstance.current.getValue();
      try {
        const formattedCode = prettier.format(unformattedCode, {
          parser: 'html', // Use 'html' parser for MJML
          plugins: [parserHtml],
        });
        editorInstance.current.setValue(formattedCode);
      } catch (error) {
        console.error('Formatting error:', error);
      }
    }
  };

  return (
    <div>
      <div className="buttons">
        <button onClick={formatCode}>FORMAT</button>
        <button onClick={() => handleCopyClick(combinedMjml)}>COPY MJML</button>
        <button onClick={() => handleCopyClick(parsedHtml)}>COPY HTML</button>
      </div>
      <MonacoEditor
        height="calc(100vh - 125px)"
        language="html"
        value={editorValue}
        onChange={handleEditorChange}
        options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
        onMount={handleEditorMount}
      />
    </div>
  );
};

export default Editor;
