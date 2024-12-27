import React from 'react';
import { Card, Text, Button, Box, InlineStack, ButtonGroup } from '@shopify/polaris';
import BlockEditor from '../BlockEditor.jsx';
import { MinusIcon } from '@shopify/polaris-icons';

export default function GroupBlock({ block, onUpdateBlock, onRemoveBlock, onAddBlock }) {
  const handleChildUpdate = (updatedChildren) => {
    onUpdateBlock({ ...block, children: updatedChildren });
  };

  return (
    <Card sectioned>
      <Text as="h2" variant="headingSm">{block.title}</Text>

      <Box paddingBlock="200">
        <BlockEditor
          blocks={block.children || []}
          setBlocks={handleChildUpdate}
          context="group"
        />
      </Box>

      <InlineStack align="center">
          <ButtonGroup>
            <Button
              destructive
              icon={MinusIcon}
              variant="secondary"
              tone="critical"
              onClick={() => onRemoveBlock(block.id)}
              accessibilityLabel="Remove Block"
            >
              Remove Block
            </Button>
          </ButtonGroup>
        </InlineStack>
    </Card>
  );
}
