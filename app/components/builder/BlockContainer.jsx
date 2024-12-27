import React, { useState } from 'react';
import {
  Card,
  InlineGrid,
  Text,
  Button,
  Box,
  ButtonGroup,
} from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';
import { Modal, TitleBar } from '@shopify/app-bridge-react';

/**
 * BlockContainer
 *
 * Handles shared functionality for blocks:
 * - Remove Block functionality with confirmation modal
 * - Common layout and styling
 * - Renders block-specific content via `renderBlock` prop
 */
export default function BlockContainer({
  block,
  onUpdateBlock,
  onRemoveBlock,
  onAddBlock,
  renderBlock,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🛠️ Handle Remove Block Modal
  const handleRemoveClick = () => setIsModalOpen(true);
  const confirmRemoveBlock = () => {
    onRemoveBlock(block.id);
    setIsModalOpen(false);
  };
  const cancelRemoveBlock = () => setIsModalOpen(false);

  return (
    <>
      <Card sectioned>
        {/* 🪄 Block Header */}
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {block.title}
          </Text>
          <Button
            destructive
            icon={DeleteIcon}
            variant="secondary"
            tone="critical"
            onClick={handleRemoveClick}
            accessibilityLabel="Remove Block"
          />
        </InlineGrid>

        {/* 🧩 Render Block-Specific Content */}
        <Box paddingBlock="200">
          {renderBlock({
            block,
            onUpdateBlock,
            onAddBlock,
          })}
        </Box>
      </Card>

      {/* 🛡️ Remove Block Confirmation Modal */}
      {isModalOpen && (
        <Modal
          open
          onClose={cancelRemoveBlock}
        >
          <TitleBar title="Remove Block" />
          <Box padding="200">
            <Text as="p">
              Are you sure you want to remove this block? This action cannot be undone.
            </Text>
          </Box>
          <Box paddingBlock="200" paddingInline="200">
            <InlineGrid columns="1fr 1fr" gap="200">
              <Button onClick={cancelRemoveBlock}>Cancel</Button>
              <Button
                destructive
                onClick={confirmRemoveBlock}
                variant="secondary"
                tone="critical"
              >
                Remove Block
              </Button>
            </InlineGrid>
          </Box>
        </Modal>
      )}
    </>
  );
}
