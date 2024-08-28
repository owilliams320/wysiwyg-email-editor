import React, { useState } from 'react';
import './TreeList.css';

interface TemplateNode {
  title: string;
  value?: string;
  templates?: TemplateNode[];
}

interface TreeListProps {
  nodes: TemplateNode[];
  onItemClick: (value: string) => void;
}

const TreeList: React.FC<TreeListProps> = ({ nodes, onItemClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>(
    {}
  );
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleClick = (value: string, title: string) => {
    setActiveNode(title);
    onItemClick(value);
  };

  const renderTree = (nodes: TemplateNode[]) => {
    return nodes.map((node) => (
      <li key={node.title}>
        <div
          className={`tree-node ${activeNode === node.title ? 'active' : ''}`}
        >
          {node.templates && (
            <button
              className="chevron"
              onClick={() => handleToggle(node.title)}
            >
              {expandedNodes[node.title] ? (
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              ) : (
                <span className="material-symbols-outlined">chevron_right</span>
              )}
            </button>
          )}
          <span
            onClick={() => node.value && handleClick(node.value, node.title)}
          >
            {node.title}
          </span>
        </div>
        {node.templates && expandedNodes[node.title] && (
          <ul>{renderTree(node.templates)}</ul>
        )}
      </li>
    ));
  };

  return <ul>{renderTree(nodes)}</ul>;
};

export default TreeList;
