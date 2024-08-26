import React, { useState, useCallback, useEffect } from 'react';
import Editor from './MonacoEditor/MonacoEditor';
import Preview from './Preview/Preview';
import mjml2html from 'mjml-browser';
import './MJMLEditor.css'; // Custom styles

const MJMLEditor: React.FC = () => {
  const [mjmlCode, setMjmlCode] = useState<string>(
    '<mjml><mj-body><mj-section><mj-column><mj-text>Welcome</mj-text></mj-column></mj-section></mj-body></mjml>'
  );

  const [combinedMjml, setCombinedMjml] = useState<string>('');
  const [html, setHtml] = useState<string>('');

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value) {
      setMjmlCode(value);
    }
  }, []);

  const fetchCssAndAttributes = async (mjml: string) => {
    try {
      // Fetch the processed CSS file
      const css = await fetch('styles.css').then((res) => res.text());

      // Fetch the MJML attributes from the XML file
      const attributes = await fetch('_mjmlStyles.xml').then((res) =>
        res.text()
      );

      // Check if the MJML has an <mj-head> tag
      const headTagRegex = /<mj-head>([\s\S]*?)<\/mj-head>/;
      const headTagMatch = mjml.match(headTagRegex);
      let mjmlWithStyle = mjml;

      if (headTagMatch) {
        // If <mj-head> exists, insert the <mj-style> and <mj-attributes> tags inside it
        const headContent = headTagMatch[1];
        const newHeadContent = `${headContent}
          ${attributes}
          <mj-style inline="inline">
            ${css}
          </mj-style>`;
        mjmlWithStyle = mjml.replace(
          headTagRegex,
          `<mj-head>${newHeadContent}</mj-head>`
        );
      } else {
        // If <mj-head> does not exist, create it with both <mj-attributes> and <mj-style> tags
        const headTagInsert = `<mj-head>
          ${attributes}
          <mj-style inline="inline">
            ${css}
          </mj-style>
        </mj-head>`;
        const headTagPosition = /<mj-body>/; // Insert before <mj-body>
        if (headTagPosition.test(mjml)) {
          mjmlWithStyle = mjml.replace(
            headTagPosition,
            `${headTagInsert}\n<mj-body>`
          );
        } else {
          // If no <mj-body>, just add it at the end
          mjmlWithStyle = `${mjml}\n${headTagInsert}`;
        }
      }

      // Set combined MJML
      setCombinedMjml(mjmlWithStyle);

      // Convert the MJML to HTML
      const { html } = mjml2html(mjmlWithStyle);
      setHtml(html);
    } catch (error) {
      console.error('Error rendering MJML:', error);
    }
  };

  useEffect(() => {
    fetchCssAndAttributes(mjmlCode);
  }, [mjmlCode]);

  useEffect(() => {
    const fetchMjmlCode = async () => {
      try {
        const response = await fetch('templates/welcomeLetter.mjml');
        const text = await response.text();
        setMjmlCode(text);
      } catch (error) {
        console.error('Error fetching MJML code:', error);
      }
    };

    fetchMjmlCode();
  }, []);

  return (
    <div className="editor-container">
      <div className="editor-left">
        <Editor
          value={mjmlCode}
          onChange={handleEditorChange}
          combinedMjml={combinedMjml}
          parsedHtml={html}
        />
      </div>
      <div className="editor-right">
        <Preview html={html} />
      </div>
    </div>
  );
};

export default MJMLEditor;
