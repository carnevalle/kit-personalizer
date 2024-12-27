import React from 'react';
import BlockContainer from '../BlockContainer.jsx';
import { Select } from '@shopify/polaris';

/**
 * VariantsBlock
 *
 * Uses BlockContainer for shared functionality and renders a variant dropdown.
 */
export default function VariantsBlock({ block, onUpdateBlock, onRemoveBlock, onAddBlock }) {
  return (
    <BlockContainer
      block={block}
      onUpdateBlock={onUpdateBlock}
      onRemoveBlock={onRemoveBlock}
      onAddBlock={onAddBlock}
      renderBlock={({ block, onUpdateBlock }) => (
        <Select
          label="Select a variant"
          options={[
            { label: 'Variant 1', value: 'variant_1' },
            { label: 'Variant 2', value: 'variant_2' },
          ]}
          value={block.properties.selectedVariant || ''}
          onChange={(value) =>
            onUpdateBlock({ ...block, properties: { selectedVariant: value } })
          }
        />
      )}
    />
  );
}
