import React from 'react';
import CustomModal from './CustomModal.jsx';
import { BlockStack, Text, Button } from '@shopify/ui-extensions-react/admin';

/**
 * AddBlockModal Component
 * Contextual modal for adding blocks in Shopify Admin UI.
 */
export default function AddBlockModal({ onClose, onAddBlock, parentType }) {
  const availableBlocks = [
    { type: 'group', label: 'Group Block' },
    { type: 'variants', label: 'Variants Block' },
    { type: 'custom_name', label: 'Custom Name Block' },
    { type: 'custom_text', label: 'Custom Text Block' },
  ];

  // Contextual Rule: Prevent adding 'group' inside another 'group'
  const filteredBlocks =
    parentType === 'group'
      ? availableBlocks.filter((block) => block.type !== 'group')
      : availableBlocks;

  return (
    <CustomModal title="Add Block" onClose={onClose}>
      <BlockStack spacing="loose">
        <Text>Select a block type to add:</Text>
        {filteredBlocks.map((block) => (
          <Button
            key={block.type}
            onClick={() => onAddBlock(block.type)}
            accessibilityLabel={`Add ${block.label}`}
          >
            {block.label}
          </Button>
        ))}
        <Button onClick={onClose} kind="secondary">
          Cancel
        </Button>
      </BlockStack>
    </CustomModal>
  );
}
