import React from 'react';

export default function GroupBlock({ block, onUpdateBlock, onRemoveBlock }) {
  return (
    <div>
      <h4>{block.title || 'Unnamed Group'}</h4>
      <button onClick={() => onRemoveBlock(block.id)}>Remove Group</button>
    </div>
  );
}
