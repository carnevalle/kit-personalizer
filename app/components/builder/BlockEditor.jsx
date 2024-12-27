import React, { useState } from 'react';
import {
  Card,
  BlockStack,
  Text,
  List,
  InlineStack,
  ButtonGroup,
  Button,
} from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import BlockRenderer from './BlockRenderer.jsx';
import AddBlockModal from './AddBlockModal.jsx';

/**
 * BlockEditor Component
 *
 * Follows Shopify UI standards:
 * - Displays a list of personalization blocks.
 * - Uses a footer button group for adding blocks.
 * - Context-aware rendering for nested and root-level blocks.
 */
export default function BlockEditor({ blocks, setBlocks, context }) {
  const [isAddBlockModalOpen, setAddBlockModalOpen] = useState(false);

  // 🧩 Add a new block to the editor
  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Block`,
      properties: {},
      children: type === 'group' ? [] : undefined,
    };
    setBlocks([...blocks, newBlock]);
    setAddBlockModalOpen(false);
  };

  // 🛠️ Update an existing block
  const updateBlock = (updatedBlock) => {
    setBlocks(blocks.map((block) => (block.id === updatedBlock.id ? updatedBlock : block)));
  };

  // 🗑️ Remove a block
  const removeBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  // ➕ Add a child block (for group context)
  const addChildBlock = (parentId, type) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === parentId && block.type === 'group') {
          const newChildBlock = {
            id: Date.now(),
            type,
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Block`,
            properties: {},
          };
          return { ...block, children: [...(block.children || []), newChildBlock] };
        }
        return block;
      })
    );
  };

  // 🪄 Determine Button Label Based on Context
  const addButtonLabel = context === 'group' ? 'Add block to group' : 'Add block';

  return (
    <Card roundedAbove="sm" background="bg-surface-secondary">
      <BlockStack gap="200">
        {/* 🪄 Title */}
        <Text as="h2" variant="headingSm" alignment='center'>
          Personalization Blocks
        </Text>

        {/* 🧩 Block List */}
        {blocks.length === 0 ? (
          <Text as="p" variant="bodyMd" alignment='center'>
            No personalization blocks added yet.
          </Text>
        ) : (
          <BlockStack gap="200">
            {blocks.map((block) => (
              <BlockRenderer
                key={block.id}
                block={block}
                onUpdateBlock={updateBlock}
                onRemoveBlock={() => removeBlock(block.id)}
                onAddBlock={(type) => addChildBlock(block.id, type)}
              />
            ))}
          </BlockStack>
        )}

        {/* 📦 Footer Actions */}
        <InlineStack align="center">
          <ButtonGroup>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={() => setAddBlockModalOpen(true)}
              accessibilityLabel={addButtonLabel}
            >
              {addButtonLabel}
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>

      {/* 📦 Add Block Modal */}
      {isAddBlockModalOpen && (
        <AddBlockModal
          onClose={() => setAddBlockModalOpen(false)}
          onSelectBlock={addBlock}
          context={context}
        />
      )}
    </Card>
  );
}
