import React from 'react';
import GroupBlock from './blocks/GroupBlock.jsx';
import VariantsBlock from './blocks/VariantsBlock.jsx';
import CustomNameBlock from './blocks/CustomNameBlock.jsx';
import CustomTextBlock from './blocks/CustomTextBlock.jsx';

export default function BlockRenderer({ block, onUpdateBlock, onRemoveBlock, onAddBlock }) {
  switch (block.type) {
    case 'group':
      return (
        <GroupBlock
          block={block}
          onUpdateBlock={onUpdateBlock}
          onRemoveBlock={onRemoveBlock}
          onAddBlock={onAddBlock}
        />
      );

    case 'variants':
      return (
        <VariantsBlock
          block={block}
          onUpdateBlock={onUpdateBlock}
          onRemoveBlock={onRemoveBlock}
        />
      );

    case 'custom_name':
      return (
        <CustomNameBlock
          block={block}
          onUpdateBlock={onUpdateBlock}
          onRemoveBlock={onRemoveBlock}
        />
      );

    case 'custom_text':
      return (
        <CustomTextBlock
          block={block}
          onUpdateBlock={onUpdateBlock}
          onRemoveBlock={onRemoveBlock}
        />
      );

    default:
      return <div>Unknown block type: {block.type}</div>;
  }
}
