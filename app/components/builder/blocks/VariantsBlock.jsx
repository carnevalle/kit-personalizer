import React from 'react';
import { Card, Select, Checkbox, Text, Button } from '@shopify/polaris';

export default function VariantsBlock({ block, onUpdateBlock, onRemoveBlock }) {
  const handlePropertyChange = (field, value) => {
    onUpdateBlock({ ...block, properties: { ...block.properties, [field]: value } });
  };

  return (
    <Card sectioned>
      <Text variant="headingSm">{block.title}</Text>

      <Select
        label="Display Type"
        options={[
          { label: 'Dropdown', value: 'dropdown' },
          { label: 'Radio Buttons', value: 'radio' },
        ]}
        value={block.properties?.display_type || 'dropdown'}
        onChange={(value) => handlePropertyChange('display_type', value)}
      />

      <Checkbox
        label="Show Thumbnails"
        checked={block.properties?.showThumbnails || false}
        onChange={(value) => handlePropertyChange('showThumbnails', value)}
      />

      <div style={{ marginTop: '10px' }}>
        <Button destructive onClick={() => onRemoveBlock(block.id)}>Remove Block</Button>
      </div>
    </Card>
  );
}
