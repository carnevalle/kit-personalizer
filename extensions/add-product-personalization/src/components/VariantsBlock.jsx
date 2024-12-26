import React from 'react';
import ProductSelector from './ProductSelector.jsx';

export default function VariantsBlock({ block, onUpdateBlock }) {
  return (
    <div>
      <h4>{block.title || 'Unnamed Variants'}</h4>
      <ProductSelector
        productId={block.product_id}
        onProductSelect={(id) => onUpdateBlock(block.id, { ...block, product_id: id })}
      />
    </div>
  );
}
