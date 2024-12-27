import React, { useState, useCallback } from 'react';
import {
  Card,
  BlockStack,
  Text,
  InlineStack,
  ButtonGroup,
  Button,
  ActionList,
  Popover,
} from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import BlockRenderer from './BlockRenderer.jsx';

/**
 * BlockEditor Component
 *
 * Enhancements:
 * - ActionList organized into two sections: `Container` and `Blocks`.
 * - Group Block appears under `Container` and is disabled in group context.
 */
export default function BlockEditor({ blocks, setBlocks, context }) {
  const [isPopoverActive, setIsPopoverActive] = useState(false);

  // 🧩 Add a new block to the editor
  const addBlock = useCallback((type) => {
    const newBlock = {
      id: Date.now(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Block`,
      properties: {},
      children: type === 'group' ? [] : undefined,
    };
    setBlocks([...blocks, newBlock]);
    setIsPopoverActive(false); // Close the popover after selection
  }, [blocks, setBlocks]);

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

  // 📝 Define ActionList Sections
  const actionListSections = [
    {
      title: 'Container',
      items: [
        {
          content: 'Group Block',
          onAction: () => addBlock('group'),
          disabled: context === 'group', // Prevent nesting groups
        },
      ],
    },
    {
      title: 'Blocks',
      items: [
        {
          content: 'Variants Block',
          onAction: () => addBlock('variants'),
        },
        {
          content: 'Custom Name Block',
          onAction: () => addBlock('custom_name'),
        },
        {
          content: 'Custom Text Block',
          onAction: () => addBlock('custom_text'),
        },
      ],
    },
  ];

  return (
    <Card roundedAbove="sm" background="bg-surface-secondary">
      {/* 🪄 Title */}
      <BlockStack gap="200" align="center">
        <Text as="h2" variant="headingSm" alignment="center">
          Personalization Blocks
        </Text>

        {/* 🧩 Block List */}
        {blocks.length === 0 ? (
          <Text as="p" variant="bodyMd" alignment="center">
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
          <Popover
            active={isPopoverActive}
            activator={
              <ButtonGroup>
                <Button
                  icon={PlusIcon}
                  variant="primary"
                  onClick={() => setIsPopoverActive((active) => !active)}
                  accessibilityLabel={addButtonLabel}
                >
                  {addButtonLabel}
                </Button>
              </ButtonGroup>
            }
            onClose={() => setIsPopoverActive(false)}
          >
            <ActionList
              actionRole="menuitem"
              sections={actionListSections}
            />
          </Popover>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}
