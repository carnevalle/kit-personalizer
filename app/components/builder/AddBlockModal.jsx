import React from 'react';
import { Modal, Button, BlockStack, Text } from '@shopify/polaris';

export default function AddBlockModal({ onClose, onSelectBlock, context }) {
  const availableBlocks = [
    { type: 'group', title: 'Group Block' },
    { type: 'variants', title: 'Variants Block' },
    { type: 'custom_name', title: 'Custom Name Block' },
    { type: 'custom_text', title: 'Custom Text Block' },
  ];

  // Remove 'group' if context is already inside a group
  const filteredBlocks = context === 'group'
    ? availableBlocks.filter((block) => block.type !== 'group')
    : availableBlocks;

  return (
    <Modal
      open
      onClose={onClose}
      title="Add a New Block"
      primaryAction={{
        content: 'Close',
        onAction: onClose,
      }}
    >
      <Modal.Section>
        <BlockStack spacing="tight">
          {filteredBlocks.map((block) => (
            <Button
              key={block.type}
              onClick={() => onSelectBlock(block.type)}
              fullWidth
            >
              {block.title}
            </Button>
          ))}
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
