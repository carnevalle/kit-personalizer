import React from 'react';
import ProductSelector from './ProductSelector.jsx';

/**
 * CustomTextBlock Component
 * Manages "Custom Text" customization block.
 */
export default function CustomTextBlock({ block, onUpdateBlock, onRemoveBlock }) {
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
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
      <h4>Custom Text</h4>

      {/* Product Selection */}
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Linked Product:</strong>
        </label>
        <ProductSelector
          productId={block.product_id}
          onProductSelect={handleProductSelect}
        />
      </div>

      {/* Text Input Toggle */}
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Enable Text Input:</strong>
        </label>
        <input
          type="checkbox"
          checked={block.properties?.textInput || false}
          onChange={(e) => updateProperty('textInput', e.target.checked)}
        />
      </div>

      {/* Placeholder Text */}
      <div style={{ marginBottom: '10px' }}>
        <label>
          <strong>Placeholder Text:</strong>
        </label>
        <input
          type="text"
          value={block.properties?.placeholder || ''}
          onChange={(e) => updateProperty('placeholder', e.target.value)}
          placeholder="e.g., Enter custom text here"
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
