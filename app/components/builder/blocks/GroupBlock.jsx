import React from 'react';
import BlockContainer from '../BlockContainer.jsx';
import BlockEditor from '../BlockEditor.jsx';

/**
 * GroupBlock
 *
 * Uses BlockContainer for shared functionality and renders nested blocks.
 */
export default function GroupBlock({ block, onUpdateBlock, onRemoveBlock, onAddBlock }) {
  const handleChildUpdate = (updatedChildren) => {
    onUpdateBlock({ ...block, children: updatedChildren });
  };

  return (
    <BlockContainer
      block={block}
      onUpdateBlock={onUpdateBlock}
      onRemoveBlock={onRemoveBlock}
      onAddBlock={onAddBlock}
      renderBlock={({ block, onUpdateBlock, onAddBlock }) => (
        <BlockEditor
          blocks={block.children || []}
          setBlocks={handleChildUpdate}
          context="group"
        />
      )}
    />
  );
}
