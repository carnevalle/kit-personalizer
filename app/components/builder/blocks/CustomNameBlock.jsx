import React from 'react';
import BlockContainer from '../BlockContainer.jsx';
import { TextField } from '@shopify/polaris';

/**
 * CustomNameBlock
 *
 * Uses BlockContainer for shared functionality and renders name and number input fields.
 */
export default function CustomNameBlock({ block, onUpdateBlock, onRemoveBlock, onAddBlock }) {
  return (
    <BlockContainer
      block={block}
      onUpdateBlock={onUpdateBlock}
      onRemoveBlock={onRemoveBlock}
      onAddBlock={onAddBlock}
      renderBlock={({ block, onUpdateBlock }) => (
        <>
          <TextField
            label="Custom Name"
            value={block.properties.name || ''}
            onChange={(value) => onUpdateBlock({ ...block, properties: { name: value } })}
            placeholder="Enter name"
          />
          <TextField
            label="Custom Number"
            value={block.properties.number || ''}
            onChange={(value) => onUpdateBlock({ ...block, properties: { number: value } })}
            placeholder="Enter number"
          />
        </>
      )}
    />
  );
}
