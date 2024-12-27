import React, { useState } from 'react';
import BlockEditor from './BlockEditor.jsx';

export default function PersonalizationBuilder() {
  const [blocks, setBlocks] = useState([]);

  return (
    <BlockEditor
      blocks={blocks}
      setBlocks={setBlocks}
      context="root"
    />
  );
}
