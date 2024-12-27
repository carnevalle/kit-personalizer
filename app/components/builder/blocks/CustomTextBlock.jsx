import React from 'react';
import BlockContainer from '../BlockContainer.jsx';

/**
 * CustomTextBlock
 *
 * Uses BlockContainer for shared functionality and renders text input.
 */
export default function CustomTextBlock({ block, onUpdateBlock, onRemoveBlock, onAddBlock }) {
  return (
    <BlockContainer
      block={block}
      onUpdateBlock={onUpdateBlock}
      onRemoveBlock={onRemoveBlock}
      onAddBlock={onAddBlock}
      renderBlock={({ block, onUpdateBlock }) => (
        <input
          type="text"
          value={block.properties.text || ''}
          onChange={(e) => onUpdateBlock({ ...block, properties: { text: e.target.value } })}
          placeholder="Enter custom text"
        />
      )}
    />
  );
}
