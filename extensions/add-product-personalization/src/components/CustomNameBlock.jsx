import React from 'react';
import ProductSelector from './ProductSelector.jsx';

/**
 * CustomNameBlock Component
 * Manages "Custom Name and Number" customization block.
 */
export default function CustomNameBlock({ block, onUpdateBlock, onRemoveBlock }) {
  /**
   * Update a specific property in the block.
   * @param {string} key - Property key.
   * @param {any} value - Property value.
   */
  const updateProperty = (key, value) => {
    onUpdateBlock({
      ...block,
      properties: {
        ...block.properties,
        [key]: value,
      },
    });
  };

  /**
   * Handle Product Selection.
   * @param {string} productId - Selected Product ID.
   */
  const handleProductSelect = (productId) => {
    onUpdateBlock({
      ...block,
      product_id: productId,
    });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h4>Custom Name and Number</h4>

      {/* Product Selection */}
      <div>
        <label>
          <strong>Linked Product:</strong>
        </label>
        <ProductSelector
          productId={block.product_id}
          onProductSelect={handleProductSelect}
        />
      </div>

      {/* Max Number Property */}
      <div style={{ marginTop: '10px' }}>
        <label>
          <strong>Max Number of Digits:</strong>
        </label>
        <input
          type="number"
          value={block.properties?.max_number || ''}
          onChange={(e) => updateProperty('max_number', parseInt(e.target.value, 10) || 0)}
          placeholder="e.g., 99"
          min="0"
        />
      </div>

      {/* Text Limit Property */}
      <div style={{ marginTop: '10px' }}>
        <label>
          <strong>Text Limit for Name:</strong>
        </label>
        <input
          type="number"
          value={block.properties?.text_limit || ''}
          onChange={(e) => updateProperty('text_limit', parseInt(e.target.value, 10) || 0)}
          placeholder="e.g., 25"
          min="0"
        />
      </div>

      {/* Block Actions */}
      <div style={{ marginTop: '15px' }}>
        <button onClick={() => onRemoveBlock(block.id)} style={{ color: 'red' }}>
          Remove Block
        </button>
      </div>
    </div>
  );
}
