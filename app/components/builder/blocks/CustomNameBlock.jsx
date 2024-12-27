import React from 'react';
import { Card, TextField, Text, Button } from '@shopify/polaris';

export default function CustomNameBlock({ block, onUpdateBlock, onRemoveBlock }) {
  const handlePropertyChange = (field, value) => {
    onUpdateBlock({ ...block, properties: { ...block.properties, [field]: value } });
  };

  return (
    <Card sectioned>
      <Text variant="headingSm">{block.title}</Text>

      <TextField
        label="Max Number"
        type="number"
        value={block.properties?.max_number || ''}
        onChange={(value) => handlePropertyChange('max_number', value)}
      />

      <TextField
        label="Text Limit"
        type="number"
        value={block.properties?.text_limit || ''}
        onChange={(value) => handlePropertyChange('text_limit', value)}
      />

      <div style={{ marginTop: '10px' }}>
        <Button destructive onClick={() => onRemoveBlock(block.id)}>Remove Block</Button>
      </div>
    </Card>
  );
}
