import React from 'react';
import { BlockStack, Text, Button, Box, InlineStack } from '@shopify/ui-extensions-react/admin';

/**
 * CustomModal Component
 * A reusable modal component for Shopify Admin Blocks following Shopify's standards.
 */
export default function CustomModal({ title, children, onClose }) {
  return (
    <Box
      padding="base"
      border="base"
      borderRadius="base"
      background="bg-surface"
      width="400px"
      maxHeight="80%"
      overflowY="auto"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
    >
      <BlockStack spacing="loose">
        {/* Modal Title */}
        <Text size="large" fontWeight="bold">
          {title}
        </Text>

        {/* Modal Content */}
        <BlockStack spacing="base">{children}</BlockStack>

        {/* Modal Actions */}
        <InlineStack alignment="end" spacing="tight">
          <Button kind="secondary" onClick={onClose}>
            Close
          </Button>
        </InlineStack>
      </BlockStack>
    </Box>
  );
}
