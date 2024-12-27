import React from 'react';
import { Card, Checkbox, TextField, Text, Button } from '@shopify/polaris';

export default function CustomTextBlock({ block, onUpdateBlock, onRemoveBlock }) {
  const handlePropertyChange = (field, value) => {
    onUpdateBlock({ ...block, properties: { ...block.properties, [field]: value } });
  };

  return (
    <Card sectioned>
      <Text variant="headingSm">{block.title}</Text>

      <Checkbox
        label="Enable Text Input"
        checked={block.properties?.textInput || false}
        onChange={(value) => handlePropertyChange('textInput', value)}
      />

      <TextField
        label="Placeholder"
        value={block.properties?.placeholder || ''}
        onChange={(value) => handlePropertyChange('placeholder', value)}
      />

      <div style={{ marginTop: '10px' }}>
        <Button destructive onClick={() => onRemoveBlock(block.id)}>Remove Block</Button>
      </div>
    </Card>
  );
}
