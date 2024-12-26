import React from 'react';
import {
  BlockStack,
  Text,
  Box,
} from '@shopify/ui-extensions-react/admin';
import GroupBlock from './GroupBlock.jsx';
import VariantsBlock from './VariantsBlock.jsx';
import CustomNameBlock from './CustomNameBlock.jsx';
import CustomTextBlock from './CustomTextBlock.jsx';

/**
 * BlockEditor Component
 * Dynamically renders blocks based on their type and manages block updates and deletions.
 */
export default function BlockEditor({
  blocks,
  onUpdateBlock,
  onRemoveBlock,
  onAddBlock,
}) {
  /**
   * Update a specific block.
   * @param {string} id - Block ID.
   * @param {object} updatedBlock - Updated block data.
   */
  const handleUpdateBlock = (id, updatedBlock) => {
    onUpdateBlock(id, updatedBlock);
  };

  /**
   * Remove a specific block.
   * @param {string} id - Block ID.
   */
  const handleRemoveBlock = (id) => {
    onRemoveBlock(id);
  };

  /**
   * Add a child block to a parent block (e.g., inside a group block).
   * @param {string} parentId - Parent Block ID.
   */
  const handleAddChildBlock = (parentId) => {
    onAddBlock('group', parentId); // Pass parentId to ensure correct nesting
  };

  return (
    <BlockStack spacing="loose">
      {blocks.length > 0 ? (
        blocks.map((block) => {
          switch (block.type) {
            /**
             * Group Block - Allows Nested Child Blocks
             */
            case 'group':
              return (
                <Box key={block.id} padding="base" border="base">
                  <GroupBlock
                    block={block}
                    onUpdateBlock={(updatedChild) =>
                      handleUpdateBlock(block.id, {
                        ...block,
                        children: block.children.map((child) =>
                          child.id === updatedChild.id ? updatedChild : child
                        ),
                      })
                    }
                    onRemoveBlock={() => handleRemoveBlock(block.id)}
                    onAddChildBlock={() => onAddBlock('group', block.id)}
                  />
                </Box>
              );

            /**
             * Variants Block
             */
            case 'variants':
              return (
                <Box key={block.id} padding="base" border="base">
                  <VariantsBlock
                    block={block}
                    onUpdateBlock={(updatedProps) =>
                      handleUpdateBlock(block.id, { ...block, properties: updatedProps })
                    }
                    onRemoveBlock={() => handleRemoveBlock(block.id)}
                  />
                </Box>
              );

            /**
             * Custom Name Block
             */
            case 'custom_name':
              return (
                <Box key={block.id} padding="base" border="base">
                  <CustomNameBlock
                    block={block}
                    onUpdateBlock={(updatedProps) =>
                      handleUpdateBlock(block.id, { ...block, properties: updatedProps })
                    }
                    onRemoveBlock={() => handleRemoveBlock(block.id)}
                  />
                </Box>
              );

            /**
             * Custom Text Block
             */
            case 'custom_text':
              return (
                <Box key={block.id} padding="base" border="base">
                  <CustomTextBlock
                    block={block}
                    onUpdateBlock={(updatedProps) =>
                      handleUpdateBlock(block.id, { ...block, properties: updatedProps })
                    }
                    onRemoveBlock={() => handleRemoveBlock(block.id)}
                  />
                </Box>
              );

            /**
             * Default Case (Failsafe for Unknown Block Types)
             */
            default:
              return (
                <Text key={block.id} style={{ color: 'red' }}>
                  Unknown block type: {block.type}
                </Text>
              );
          }
        })
      ) : (
        <Text>No blocks added yet. Use the "Add Block" button to add one.</Text>
      )}
    </BlockStack>
  );
}
